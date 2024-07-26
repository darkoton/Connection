import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins.js';
import vars from '@/assets/style/modules/vars.js';
import { List } from '@mui/material';
import Message from '@/components/Chat/Message';
import useChatStore from '@/stores/chat.js';
import { useRef, useEffect } from 'react';
export default function ListMessages() {
  const { chat, messages, chatScroll, setChatList, scrollDown } =
    useChatStore();
  const listRef = useRef();

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

  return (
    <>
      <ListStyled ref={listRef}>
        {chat &&
          (() => {
            // let prevUser = null;
            let showAvatar = true;
            return messages.map((mess, i) => {
              // console.log(prevUser, mess.userUid);
              if (messages[i + 1] && mess.userUid == messages[i + 1].userUid) {
                showAvatar = false;
              } else {
                showAvatar = true;
              }

              // prevUser = mess.userUid;

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
