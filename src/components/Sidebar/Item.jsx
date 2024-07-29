import styled from '@emotion/styled';
import Avatar from '@/components/User/Avatar';
import * as mixins from '@/assets/style/modules/mixins';
import vars from '@/assets/style/modules/vars';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ListItem } from '@mui/material';
import propTypes from 'prop-types';
import useUserStore from '@/stores/user';
import { useRef } from 'react';

ChatItem.propTypes = {
  chat: propTypes.object,
};

export default function ChatItem({ chat, ...props }) {
  const { user: currentUser } = useUserStore();
  const user = useRef(
    chat.users[chat.pair.filter(i => i != currentUser.uid)[0]],
  );

  return (
    <Body {...props}>
      <AvatarStyled user={user.current} size={60} current alt="Travis Howard" />

      <Info>
        <Left>
          <Username>{user.current.displayName}</Username>
          <Message>{chat.lastMessage.text}</Message>
        </Left>
        <Right>
          <Time>
            {chat.lastMessage.date
              .toDate()
              .toLocaleTimeString()
              .split(':')
              .slice(0, 2)
              .join(':')}
          </Time>

          {chat.lastMessage.check ? (
            <Check as={DoneAllIcon} />
          ) : (
            <Check as={DoneIcon} />
          )}
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
  overflow: hidden;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
`;

const Username = styled.span`
  ${mixins.adaptivValue('font-size', 16, 14, 1)}
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

const Check = styled.div`
  ${mixins.adaptivValue('font-size', 22, 18, 1)}
  color:${vars.$colorMain}
`;
