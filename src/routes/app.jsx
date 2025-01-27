import UserSideBar from '@/components/UserSideBar';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUiStore from '@/stores/ui';
import useChatStore from '@/stores/chat';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';

export default function Main() {
  const { userSidebar } = useUiStore();
  const { user: chatUser } = useChatStore();
  return (
    <ProtectedRoute>
      <div className="app">
        <Sidebar />
        <Outlet />
        {userSidebar && chatUser && <UserSideBar />}

        <Info>
          <BigTooltip title="You can add the developer as a friend using the friendship code #8R4wyK">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </BigTooltip>
        </Info>
      </div>
    </ProtectedRoute>
  );
}

const Info = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const BigTooltip = muiStyled(({ ...props }) => <Tooltip {...props} />)(() => ({
  fontSize: 20,
}));