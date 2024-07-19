import ChatList from '@/components/ChatList/List';
import UserSideBar from '@/components/UserSideBar';
import Chat from '@/components/Chat/Chat';
import useUserStore from '@/stores/user.js';
import Loading from '@/components/Loading';

export default function Main() {
  const { user } = useUserStore();
  return (
    <>
      {user ? (
        <div className="app">
          <div></div>
          <ChatList />
          <Chat />
          <UserSideBar />
        </div>
      ) : (
        <Loading size={100}>Loading</Loading>
      )}
    </>
  );
}
