import UserSideBar from '@/components/UserSideBar';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUiStore from '@/stores/ui';
import useChatStore from '@/stores/chat';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Main() {
  const { userSidebar } = useUiStore();
  const { user: chatUser } = useChatStore();
  return (
    <ProtectedRoute>
      <div className="app">
        <Sidebar />
        <Outlet />
        {userSidebar && chatUser && <UserSideBar />}
      </div>
    </ProtectedRoute>
  );
}
