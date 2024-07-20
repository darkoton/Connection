import UserSideBar from '@/components/UserSideBar';
import Chat from '@/components/Chat/Chat';
import useUserStore from '@/stores/user.js';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Main() {
  const { user } = useUserStore();
  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          <Chat />
          <UserSideBar />
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}
