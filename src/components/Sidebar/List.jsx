import styled from '@emotion/styled';
import { List } from '@mui/material';
import ChatsListItem from '@/components/Sidebar/Item';
import { useEffect, useState, useRef } from 'react';
import useUserStore from '@/stores/user';
import useChatStore from '@/stores/chat';
import { useNavigate } from 'react-router-dom';
import { watchData, getDatas } from '@/utils/firestore';
import { limit, orderBy, startAfter } from 'firebase/firestore';
import { scrollbars } from '@/assets/style/modules/mixins';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { user } = useUserStore();
  const { chat: currentChat, setChat, setUser } = useChatStore();
  const navigate = useNavigate();
  const [noChats, setNoChats] = useState(false);
  const listRef = useRef(null);
  const isLoad = useRef(false);
  const LastDocRef = useRef(null);

  useEffect(() => {
    let firstLoad = true;

    const unsubscribe = watchData(
      ['chats'],
      snapshot => {
        const changes = snapshot.docChanges();
        if (!changes.length) {
          setNoChats(true);
          firstLoad = false;
          return;
        } else {
          setNoChats(false);
        }

        if (firstLoad) {
          firstLoad = false;
          setChats(changes.map(d => d.doc.data()));
          LastDocRef.current = changes[changes.length - 1].doc;
          return;
        }

        setChats(prevChats => {
          const updatedChats = [...prevChats];
          changes.forEach(c => {
            if (c.type == 'added') {
              updatedChats.unshift(c.doc.data());
            } else if (c.type == 'modified') {
              if (updatedChats.findIndex(i => i.id == c.doc.id) < 0) {
                updatedChats.unshift(c.doc.data());
              } else {
                updatedChats[updatedChats.findIndex(i => i.id == c.doc.id)] =
                  c.doc.data();
              }
            }
          });
          updatedChats.sort(
            (a, b) => b.lastMessage.date.seconds - a.lastMessage.date.seconds,
          );
          return updatedChats;
        });
      },
      {
        wheres: [['pair', 'array-contains', user.uid]],
        other: [limit(30), orderBy('lastMessage.date', 'desc')],
      },
    );

    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    const list = listRef.current;
    async function scrollLoading(e) {
      const target = e.target;
      const scrollTop = e.target.scrollTop;

      if (
        LastDocRef.current &&
        !isLoad.current &&
        scrollTop + target.offsetHeight >= target.scrollHeight - 350
      ) {
        isLoad.current = true;

        const { data, last } = await getDatas(
          ['chats'],
          {
            wheres: [['pair', 'array-contains', user.uid]],

            other: [
              limit(30),
              orderBy('lastMessage.date', 'desc'),
              startAfter(LastDocRef.current),
            ],
          },
          { last: true },
        );
        setChats([...chats, ...data]);

        LastDocRef.current = last;
        isLoad.current = false;
      }
    }

    list.addEventListener('scroll', scrollLoading);

    return () => {
      list.removeEventListener('scroll', scrollLoading);
    };
  }, [chats, user.uid]);

  const selectChat = chat => () => {
    if (currentChat?.id == chat.id) {
      setChat(chat);
      return;
    }

    const chatUser = chat.users[chat.pair.filter(u => u != user.uid)[0]];

    setChat(chat);
    setUser(chatUser);
    navigate('/app/chat/' + chat.id);
  };
  return (
    <>
      <ListStyled ref={listRef}>
        {!noChats ? (
          chats.map(chat => (
            <ChatsListItem
              onClick={selectChat(chat)}
              chat={chat}
              key={chat.id}
            />
          ))
        ) : (
          <Empty>No chats</Empty>
        )}
      </ListStyled>
    </>
  );
}

const ListStyled = styled(List)`
  width: 100%;
  overflow: auto;
  ${scrollbars(5, '#252c41', 'transparent', 50)}
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  height: 100%;
`;
