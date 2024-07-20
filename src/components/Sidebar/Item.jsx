import styled from '@emotion/styled';
import Avatar from '@/components/User/Avatar';
import * as mixins from '@/assets/style/modules/mixins.js';
import vars from '@/assets/style/modules/vars.js';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ListItem } from '@mui/material';

export default function ChatItem() {
  return (
    <Body>
      <AvatarStyled size={60} current alt="Travis Howard" />

      <Info>
        <Left>
          <Username>Username</Username>
          <Message>Message</Message>
        </Left>
        <Right>
          <Time>13:32</Time>
          <Check />
        </Right>
      </Info>
    </Body>
  );
}
const Body = styled(ListItem)`
  display: flex;
  align-items: center;
  width: 100%;
  ${mixins.adaptivValue('column-gap', 15, 10, 1)}

  @media (any-hover:hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background-color: #222233;
    }
  }
`;

const AvatarStyled = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  ${mixins.adaptivValue('font-size', 16, 14, 1)}
`;

const Message = styled.span`
  color: ${vars.$colorMain};
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Time = styled.div`
  ${mixins.adaptivValue('font-size', 16, 14, 1)}
`;

const Check = styled(DoneAllIcon)`
  ${mixins.adaptivValue('font-size', 22, 18, 1)}
  color:${vars.$colorMain}
`;
