import styled from '@emotion/styled';
import Header from '@/components/Chat/Header';
import Field from '@/components/Chat/Field';
import ListMessages from '@/components/Chat/ListMessages';
import useChatStore from '@/stores/chat';

export default function Chat() {
  const { user: userChat } = useChatStore();

  return (
    <ChatStyled>
      {userChat && (
        <>
          <Header />
          <Messages />
          <Field />
        </>
      )}
    </ChatStyled>
  );
}

const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
  background: #161628;
`;

const Messages = styled(ListMessages)`
  flex: 1 1 auto;
  max-height: 100vh;
  overflow: auto;
`;
