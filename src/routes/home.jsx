import UserSideBar from '@/components/UserSideBar';
import useUserStore from '@/stores/user.js';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUiStore from '@/stores/ui';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const { user } = useUserStore();
  const { userSidebar } = useUiStore();

  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          <Outlet />

          {userSidebar && <UserSideBar />}
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}
