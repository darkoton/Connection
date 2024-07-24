import styled from '@emotion/styled';
import Header from '@/components/Chat/Header';
import Field from '@/components/Chat/Field';
import ListMessages from '@/components/Chat/ListMessages';

export default function Chat() {
  return (
    <ChatStyled>
      <Header />
      <Messages />
      <Field />
    </ChatStyled>
  );
}

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: #161628;
  max-height: 100vh;
`;

const Messages = styled(ListMessages)`
  flex: 1 1 auto;
  max-height: 100vh;
  overflow: auto;
`;
