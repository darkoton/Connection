import { css } from '@emotion/react';
import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars.js';
import * as mixins from '@/assets/style/modules/mixins.js';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import Avatar from '@/components/User/Avatar';
import useChatStore from '@/stores/chat';
import useUiStore from '@/stores/ui';

export default function Header() {
  const { user } = useChatStore();
  const { userSidebar, setUserSidebar } = useUiStore();
  return (
    <Body>
      <User>
        <Avatar size={60} user={user} />
        <Info>
          <Username>{user.displayName}</Username>
          <Status>is only</Status>
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
`;

const User = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = css`
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
`;

const Username = styled.span`
  ${Text}
`;

const Status = styled.span`
  ${Text}
  color: ${vars.$colorMain};
`;

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
`;
