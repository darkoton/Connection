import styled from '@emotion/styled';
import { ListItem, Avatar } from '@mui/material';
import avatarImg from '@/assets/img/avatar.png';
import * as mixins from '@/assets/style/modules/mixins.js';
import vector from '@/assets/img/message-element.svg';

export default function Message() {
  return (
    <Body>
      <AvatarStyled src={avatarImg} alt="avatar" />
      <MessageText>
        <VectorMessage src={vector} alt="" />
        Text message
      </MessageText>
    </Body>
  );
}

const Body = styled(ListItem)`
  display: flex;
  align-items: flex-end;
  ${mixins.adaptivValue('column-gap', 20, 10, 1)}
`;

const AvatarStyled = styled(Avatar)`
  width: 100%;
  height: 100%;
  max-width: 45px;
  object-fit: cover;
`;
const MessageText = styled.p`
  padding: 9.5px 9px;
  background: #fff;
  border-radius: 14px;
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: center;
  color: #000;
  ${mixins.adaptivValue('font-size', 17, 14, 1)}
`;

const VectorMessage = styled.img`
  position: absolute;
  left: 0;
  bottom: -0.1px;
  transform: translateX(-50%);
`;
