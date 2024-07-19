import propTypes from 'prop-types';
import { ListItem } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Avatar from '@/components/User/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import vars from '@/assets/style/modules/vars.js';

Friend.propTypes = {
  invite: propTypes.bool,
  user: propTypes.object,
  onAccept: propTypes.func,
  onReject: propTypes.func,
};

export default function Friend({ invite, user, onAccept, onReject }) {
  return (
    <FriendStyled>
      <Left>
        <Avatar user={user} />
        <Username>{user.displayName}</Username>
      </Left>

      {invite && (
        <Invite>
          <Accept onClick={onAccept}>
            <CheckIcon sx={Icon} />
          </Accept>
          <Reject onClick={onReject}>
            <ClearIcon sx={Icon} />
          </Reject>
        </Invite>
      )}
    </FriendStyled>
  );
}

const FriendStyled = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const Username = styled.span`
  font-size: 20px;
  /* white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; */
`;

const Invite = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 50%;
  border: 1px solid #464646;
  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const Icon = css`
  font-size: 30px;
`;

const Accept = styled(Button)`
  color: ${vars.$colorSuccess};

  @media (any-hover: hover) {
    &:hover {
      box-shadow: inset 0 0 0 2px ${vars.$colorSuccess};
    }
  }
`;

const Reject = styled(Button)`
  color: ${vars.$colorError};

  @media (any-hover: hover) {
    &:hover {
      box-shadow: inset 0 0 0 2px ${vars.$colorError};
    }
  }
`;
