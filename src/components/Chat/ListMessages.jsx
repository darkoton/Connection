import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins';
import vars from '@/assets/style/modules/vars';
import { List } from '@mui/material';
import Message from '@/components/Chat/Message';
import useChatStore from '@/stores/chat';
import { useRef, useEffect } from 'react';
import { getDatas } from '@/utils/firestore';
import { orderBy, limit, startAfter } from 'firebase/firestore';

export default function ListMessages() {
  const {
    chat,
    messages,
    setMessages,
    chatScroll,
    setChatList,
    scrollDown,
    lastMessageDoc,
    setLastMessageDoc,
  } = useChatStore();
  const listRef = useRef();
  const isLoad = useRef(false);

  useEffect(() => {
    if (listRef.current) {
      setChatList(listRef.current);
    }
  }, [setChatList]);

  useEffect(() => {
    if (
      messages.length &&
      listRef.current.scrollTop + listRef.current.offsetHeight == chatScroll
    ) {
      scrollDown();
    }
  }, [chatScroll, scrollDown, messages.length]);

  useEffect(() => {
    const list = listRef.current;
    async function scrollLoadHandle(e) {
      const y = e.target.scrollTop;

      if (!lastMessageDoc) {
        return;
      }

      if (y < 150 && !isLoad.current) {
        isLoad.current = true;
        const { data, last } = await getDatas(
          ['chats', chat.id, 'messages'],
          {
            other: [
              orderBy('date', 'desc'),
              limit(30),
              startAfter(lastMessageDoc),
            ],
          },
          { last: true, id: true },
        );
        setMessages([...data.reverse(), ...messages]);
        setLastMessageDoc(last);
        isLoad.current = false;
      }
    }

    list.addEventListener('scroll', scrollLoadHandle);

    return () => {
      list.removeEventListener('scroll', scrollLoadHandle);
    };
  }, [chat.id, lastMessageDoc, messages, setMessages]);

  return (
    <>
      <ListStyled ref={listRef} className="test">
        {chat &&
          (() => {
            let showAvatar = true;
            return messages.map((mess, i) => {
              if (messages[i + 1] && mess.userUid == messages[i + 1].userUid) {
                showAvatar = false;
              } else {
                showAvatar = true;
              }

              return (
                <Message
                  key={mess.id}
                  showAvatar={showAvatar}
                  data={mess}
                ></Message>
              );
            });
          })()}
      </ListStyled>
    </>
  );
}

const ListStyled = styled(List)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* justify-content: flex-end; */
  flex: 1 1 auto;
  ${mixins.scrollbars(5, vars.$colorMain, '#111')}
  ${mixins.adaptivIndent('padding', 19, 15, 15, 5, 1)}
`;
