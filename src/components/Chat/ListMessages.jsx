import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins.js';
import { List } from '@mui/material';
import Message from '@/components/Chat/Message';
import useChatStore from '@/stores/chat.js';
export default function ListMessages() {
  const { chat, messages } = useChatStore();
  return (
    <>
      <ListStyled>
        {chat &&
          messages.map(mess => <Message key={mess.id} data={mess}></Message>)}
      </ListStyled>
    </>
  );
}

const ListStyled = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1 1 auto;
  ${mixins.adaptivIndent('padding', 19, 15, 15, 5, 1)}
`;
