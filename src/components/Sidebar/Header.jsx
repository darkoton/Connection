import { AppBar, Toolbar } from '@mui/material';
import logo from '@/assets/img/logo.png';
import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins.js';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import vars from '@/assets/style/modules/vars.js';
import { useState } from 'react';
import InviteFriendModal from '@/components/InviteFriendModal';

export default function SideHeader() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <AppBarStyled position="sticky">
        <ToolbarStyled>
          <Logo src={logo} alt="Logo" />
          <InputBody>
            <InputHeader placeholder="Search..." />
            <SearchIconStyled />
          </InputBody>
          <PersonAddAltIconStyled onClick={openModal} />
        </ToolbarStyled>
      </AppBarStyled>
      <InviteFriendModal open={open} onClose={closeModal} />
    </>
  );
}

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  background-image: none;
  box-shadow: none;
`;

const ToolbarStyled = styled(Toolbar)`
  ${mixins.adaptivValue('column-gap', 10, 6, 1)}
`;

const Logo = styled.img`
  width: 100%;
  max-width: 45px;
  object-fit: cover;
`;

const InputBody = styled.div`
  background-color: #303030;
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mixins.adaptivIndent('padding', 6, 4, 10, 6, 1)}
  flex: 1 1 auto;
`;

const InputHeader = styled.input`
  ${mixins.adaptivValue('font-size', 16, 14, 1)}
  background: transparent;
  width: 100%;
  padding-right: 10px;
`;

const SearchIconStyled = styled(SearchIcon)`
  ${mixins.adaptivValue('font-size', 30, 24, 1)}
`;

const PersonAddAltIconStyled = styled(PersonAddAltIcon)`
  ${mixins.adaptivValue('font-size', 30, 28, 1)}
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
