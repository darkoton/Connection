import styled from '@emotion/styled';
import { css } from '@emotion/react';
import vars from '@/assets/style/modules/vars';
import * as mixins from '@/assets/style/modules/mixins';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@/components/User/Avatar';
import { List, ListItem } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import useChatStore from '@/stores/chat';
import useUiStore from '@/stores/ui';
import useUserStore from '@/stores/user';
import { updateData, deleteData } from '@/utils/firestore';
import { arrayRemove } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function UserSideBar() {
  const { user: chatUser, chat, setUser } = useChatStore();
  const { setUserSidebar } = useUiStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  async function removeFriend() {
    await updateData(['users', user.uid], {
      friends: arrayRemove(chatUser.uid),
    });

    await updateData(['users', chatUser.uid], {
      friends: arrayRemove(user.uid),
    });

    if (chat) {
      await deleteData(['chats', chat.id]);
    }

    setUser(null);
    navigate('/');
  }

  return (
    <AsideBody>
      <Backdrop onClick={() => setUserSidebar(false)} />
      <Aside>
        <Header>
          <Title>Information</Title>
          <Close onClick={() => setUserSidebar(false)} />
        </Header>
        <User>
          <Avatar current size={70} user={chatUser} />
          <UserInfo>
            <Username>{chatUser.displayName}</Username>
            {/* <Status>Is only</Status> */}
          </UserInfo>
        </User>
        <ListStyled>
          {/* <ListItemStyled>
            <ListItemLeft>
              <NotificationsNoneIcon css={Icon} />
              <span>Notification</span>
            </ListItemLeft>
            <ListItemRight></ListItemRight>
          </ListItemStyled> */}

          <RedItem onClick={removeFriend}>
            <ListItemLeft>
              <PersonRemoveIcon css={Icon} />
              <span>Remove from friends</span>
            </ListItemLeft>
            <ListItemRight></ListItemRight>
          </RedItem>
        </ListStyled>
      </Aside>
    </AsideBody>
  );
}

const AsideBody = styled.div`
  @media (max-width: 1140px) {
    position: absolute;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 5px;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 350px;
  background-color: ${vars.$colorChat};
  ${mixins.adaptivValue('padding', 20, 15, 1)}
  ${mixins.adaptivValue('column-gap', 15, 7.5, 1)}

  & * {
    user-select: none;
  }

  @media (max-width: 1140px) {
    height: auto;
  }
`;

const Backdrop = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  @media (max-width: 1140px) {
    display: block;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  ${mixins.adaptivValue('font-size', 20, 18, 1)}
`;

const Close = styled(CloseIcon)`
  ${mixins.adaptivValue('font-size', 35, 24, 1)}

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

const User = styled.div`
  display: flex;
  align-items: center;
  ${mixins.adaptivValue('column-gap', 15, 7.5, 1)}
  ${mixins.adaptivIndent('padding', 15, 7.5, 0, 0, 1)}
  border-bottom: 9px solid #3151A3;
  ${mixins.adaptivValue('border-bottom-width', 9, 3, 1)}
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 1px;
`;

const Username = styled.span`
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// const Status = styled.span`
//   color: ${vars.$colorMain};
//   ${mixins.adaptivValue('font-size', 18, 16, 1)}
// `;

const ListStyled = styled(List)`
  display: flex;
  flex-direction: column;
  ${mixins.adaptivValue('row-gap', 8, 4, 1)}
`;

const ListItemStyled = styled(ListItem)`
  border-radius: 999px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background-color: #2d3855;
    }
  }
`;

const Icon = css`
  ${mixins.adaptivValue('font-size', 26, 22, 1)}
`;

const ListItemLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  & span {
    ${mixins.adaptivValue('font-size', 18, 16, 1)}
  }
`;

const ListItemRight = styled.div`
  display: flex;
  align-items: center;
`;

const RedItem = styled(ListItemStyled)`
  color: #be4646;
`;
