import { SwipeableDrawer, Box } from '@mui/material/';
import propTypes from 'prop-types';
import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars.js';
import useUserStore from '@/stores/user.js';
import Avatar from '@/components/User/Avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '@/components/User/EditDialog';

Menu.propTypes = {
  open: propTypes.bool,
  toggle: propTypes.func,
};

export default function Menu({ open, toggle }) {
  const { user } = useUserStore();
  const [copied, setCopied] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function copy() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  }

  return (
    <>
      <EditModal open={editOpen} onClose={() => setEditOpen(false)} />

      <SwipeableDrawer
        sx={{
          paper: {
            background: 'red',
          },
        }}
        open={open}
        anchor="left"
        onOpen={toggle(true)}
        onClose={toggle(false)}
        PaperProps={{
          sx: {
            backgroundColor: vars.$colorAside,
            backgroundImage: 'none',
          },
        }}
      >
        <BoxStyled role="presentation">
          {user && (
            <Profile>
              <Flex justifyBetween={true} itemsStart>
                <AvatarStyled size={80} />
                <EditButton onClick={() => setEditOpen(true)} />
              </Flex>
              <Username>{user.displayName}</Username>
              <CopyToClipboard text={user.tag} onCopy={copy}>
                <Tag className={copied && 'copied'}>{user.tag}</Tag>
              </CopyToClipboard>
            </Profile>
          )}
        </BoxStyled>
      </SwipeableDrawer>
    </>
  );
}

const BoxStyled = styled(Box)`
  width: 300px;
  padding: 10px 0;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 0 15px;
`;

const Username = styled.span`
  color: #fff;
  font-size: 18px;
`;

const Tag = styled.span`
  color: ${vars.$colorMain};
  font-size: 16px;
  user-select: none;
  transition: all 0.3s ease 0s;

  &.copied {
    color: ${vars.$colorSuccess};
  }

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AvatarStyled = styled(Avatar)`
  margin-bottom: 5px;
`;

const Flex = styled.div(
  props => `
  display: flex;
  ${(props.justifyBetween && 'justify-content: space-between;') || (props.justifyAround && 'justify-content: space-around;') || (props.justifyEvenly && 'justify-content: space-evenly;')}
  ${(props.itemsCenter && 'align-items: center;') || (props.itemsStart && 'align-items: flex-start;') || (props.itemsEnd && 'align-items: flex-end;')}
  `,
);

const EditButton = styled(EditIcon)`
  padding: 5px;
  border-radius: 50%;
  font-size: 33px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background-color: rgba(124, 124, 124, 0.3);
    }
  }

  &:active {
    background-color: rgba(124, 124, 124, 0.5);
  }
`;
