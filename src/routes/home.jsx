import UserSideBar from '@/components/UserSideBar';
import Chat from '@/components/Chat/Chat';
import useUserStore from '@/stores/user.js';
import Loading from '@/components/Loading';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const { user } = useUserStore();
  return (
    <>
      {user ? (
        <div className="app">
          <Outlet />
          <Chat />
          <UserSideBar />
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}
