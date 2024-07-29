import styled from '@emotion/styled';
import Header from '@/components/Chat/Header';
import Field from '@/components/Chat/Field';
import ListMessages from '@/components/Chat/ListMessages';
import vars from '@/assets/style/modules/vars';
import useChatStore from '@/stores/chat';

export default function Chat() {
  const { user: userChat } = useChatStore();

  return (
    <ChatStyled>
      {userChat ? (
        <>
          <Header />
          <Messages />
          <Field />
        </>
      ) : (
        <Empty>Choose who you would like to write to</Empty>
      )}
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

const Empty = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: ${vars.$colorMain};
`;
