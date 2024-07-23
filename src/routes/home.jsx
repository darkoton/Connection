import UserSideBar from '@/components/UserSideBar';
import Chat from '@/components/Chat/Chat';
import useUserStore from '@/stores/user.js';
import useChatStore from '@/stores/chat';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar/Sidebar';
import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars.js';
import useUiStore from '@/stores/ui';

export default function Main() {
  const { user } = useUserStore();
  const { user: userChat } = useChatStore();
  const { userSidebar } = useUiStore();
  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          {userChat ? (
            <>
              <Chat />
              {userSidebar && <UserSideBar />}
            </>
          ) : (
            <Empty>Choose who you would like to write to</Empty>
          )}
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}

const Empty = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: ${vars.$colorMain};
`;
