import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as mixins from '@/assets/style/modules/mixins.js';
import vars from '@/assets/style/modules/vars.js';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function Field() {
  return (
    <Body>
      <Clip />
      <Input placeholder="Input message..." />
      <Actions>
        <Emoji />
        <Mic />
      </Actions>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  background: ${vars.$colorChat};
  ${mixins.adaptivIndent('padding', 17, 12, 20, 16, 1)}
`;

const Icon = css`
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

const Clip = styled(AttachFileOutlinedIcon)`
  ${Icon}
`;

const Emoji = styled(SentimentSatisfiedOutlinedIcon)`
  ${Icon}
`;

const Mic = styled(MicNoneOutlinedIcon)`
  ${Icon}
`;

const Input = styled.input`
  flex: 1 1 auto;
  background: transparent;
  ${mixins.adaptivValue('font-size', 21, 18, 1)}
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
