import styled from '@emotion/styled';
import { css } from '@emotion/react';
import vars from '@/assets/style/modules/vars.js';
import * as mixins from '@/assets/style/modules/mixins.js';
import CloseIcon from '@mui/icons-material/Close';
import avatar from '@/assets/img/avatar.png';
import { Avatar } from '@mui/material';
import { List, ListItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';

export default function UserSideBar() {
  return (
    <Aside>
      <Header>
        <Title>Information</Title>
        <Close />
      </Header>
      <User>
        <AvatarStyled src={avatar} />
        <UserInfo>
          <Username>Username</Username>
          <Status>Is only</Status>
        </UserInfo>
      </User>

      <ListStyled>
        <ListItemStyled>
          <ListItemLeft>
            <NotificationsNoneIcon css={Icon} />
            <span>Notification</span>
          </ListItemLeft>
          <ListItemRight></ListItemRight>
        </ListItemStyled>

        <RedItem>
          <ListItemLeft>
            <BackHandOutlinedIcon css={Icon} />
            <span>Block</span>
          </ListItemLeft>
          <ListItemRight></ListItemRight>
        </RedItem>
      </ListStyled>
    </Aside>
  );
}

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  background-color: ${vars.$colorChat};
  ${mixins.adaptivValue('padding', 20, 15, 1)}
  ${mixins.adaptivValue('column-gap', 15, 7.5, 1)}
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

const AvatarStyled = styled(Avatar)`
  width: 100%;
  height: 100%;
  max-width: 70px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1px;
`;

const Username = styled.span`
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
`;

const Status = styled.span`
  color: ${vars.$colorMain};
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
`;

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
