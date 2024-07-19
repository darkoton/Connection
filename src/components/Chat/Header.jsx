import { css } from '@emotion/react';
import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars.js';
import * as mixins from '@/assets/style/modules/mixins.js';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
export default function Header() {
  return (
    <Body>
      <User>
        <Username>Username</Username>
        <Status>is only</Status>
      </User>

      <Icon />
    </Body>
  );
}

const Body = styled.div`
  background-color: ${vars.$colorChat};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mixins.adaptivIndent('padding', 10, 6, 20, 10, 1)}
`;

const User = styled.div`
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
      transition: all 0.3s ease 0s;
    }
    &:hover {
      color: ${vars.$colorMain};
    }
  }
`;
