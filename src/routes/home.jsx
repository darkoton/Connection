import UserSideBar from '@/components/UserSideBar';
import useUserStore from '@/stores/user';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUiStore from '@/stores/ui';
import useChatStore from '@/stores/chat';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const { user } = useUserStore();
  const { userSidebar } = useUiStore();
  const { user: chatUse } = useChatStore();
  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          <Outlet />

          {userSidebar && chatUse && <UserSideBar />}
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}
