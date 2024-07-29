import styled from '@emotion/styled';
import { List } from '@mui/material';
import ChatsListItem from '@/components/Sidebar/Item';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/user';
import useChatStore from '@/stores/chat';
import { useNavigate } from 'react-router-dom';
import { watchData } from '../../utils/firestore';
import { limit, orderBy } from 'firebase/firestore';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { user } = useUserStore();
  const { chat: currentChat, setChat, setUser } = useChatStore();
  const navigate = useNavigate();
  const [noChats, setNoChats] = useState(false);
  // const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    let firstLoad = true;

    const unsubscribe = watchData(
      ['chats'],
      snapshot => {
        const changes = snapshot.docChanges();

        if (!changes.length) {
          setNoChats(true);
          return;
        }

        if (firstLoad) {
          firstLoad = false;
          setChats(changes.map(d => d.doc.data()));
          return;
        }

        setChats(prevChats => {
          const updatedChats = [...prevChats];
          changes.forEach(c => {
            if (c.type == 'added') {
              updatedChats.unshift(c.doc.data());
            } else if (c.type == 'modified') {
              updatedChats[updatedChats.findIndex(i => i.id == c.doc.id)] =
                c.doc.data();
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
        other: [limit(20), orderBy('lastMessage.date', 'desc')],
      },
    );

    return unsubscribe;
  }, [user.uid]);

  const selectChat = chat => () => {
    if (currentChat?.id == chat.id) {
      return;
    }

    const chatUser = chat.users[chat.pair.filter(u => u != user.uid)[0]];

    setChat(chat);
    setUser(chatUser);
    navigate('/chat/' + chat.id);
  };
  return (
    <>
      {!noChats ? (
        <ListStyled>
          {chats.map(chat => (
            <ChatsListItem
              onClick={selectChat(chat)}
              chat={chat}
              key={chat.id}
            />
          ))}
        </ListStyled>
      ) : (
        <Empty>No chats</Empty>
      )}
    </>
  );
}

const ListStyled = styled(List)`
  width: 100%;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  height: 100%;
`;
