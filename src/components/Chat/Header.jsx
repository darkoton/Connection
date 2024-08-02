import { css } from '@emotion/react';
import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import * as mixins from '@/assets/style/modules/mixins';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import Avatar from '@/components/User/Avatar';
import useChatStore from '@/stores/chat';
import useUiStore from '@/stores/ui';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, setChat, setUser } = useChatStore();
  const { userSidebar, setUserSidebar, setSidebar } = useUiStore();
  const navigate = useNavigate();

  function closeChat() {
    setChat(null);
    setUser(null);
    setSidebar(true);
    navigate('/');
  }

  return (
    <Body>
      <Back onClick={closeChat} />
      <User onClick={() => setUserSidebar(!userSidebar)}>
        <Avatar size={60} user={user} adaptiv />
        <Info>
          <Username>{user.displayName}</Username>
          {/* <Status>is only</Status> */}
        </Info>
      </User>
      <Icon
        onClick={() => setUserSidebar(!userSidebar)}
        sx={{ transform: !userSidebar && 'scaleX(-1)' }}
      />
    </Body>
  );
}

const Body = styled.div`
  user-select: none;
  background-color: ${vars.$colorChat};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mixins.adaptivIndent('padding', 10, 6, 20, 10, 1)}
  column-gap: 10px;
`;

const User = styled.div`
  display: flex;
  ${mixins.adaptivValue('column-gap', 20, 5, 1)}
  align-items: center;
  width: 100%;
  overflow: hidden;
  @media (any-hover: hover) {
    & {
      cursor: pointer;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Text = css`
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
`;

const Username = styled.span`
  ${Text}
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// const Status = styled.span`
//   ${Text}
//   color: ${vars.$colorMain};
// `;

const Icon = styled(StartOutlinedIcon)`
  ${mixins.adaptivValue('font-size', 30, 25, 1)}

  @media (any-hover:hover) {
    & {
      cursor: pointer;
      transition: color 0.3s ease 0s;
    }
    &:hover {
      color: ${vars.$colorMain};
    }
  }

  @media (max-width: 1140px) {
    display: none;
  }
`;

const Back = styled(KeyboardBackspaceIcon)`
  display: none;
  ${mixins.adaptivValue('font-size', 35, 27, 1, null, 960)}

  @media (max-width: 960px) {
    display: block;
  }
`;
