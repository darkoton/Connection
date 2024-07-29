import styled from '@emotion/styled';
import ThreePIcon from '@mui/icons-material/ThreeP';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import { css } from '@emotion/react';
import vars from '@/assets/style/modules/vars';
import Menu from '@/components/Sidebar/Menu';
import { useState } from 'react';
import useUiStore from '@/stores/ui';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { setChatList } = useUiStore();

  const menuToggle = v => () => {
    setMenuOpen(v);
  };

  return (
    <Aside>
      <Menu open={menuOpen} toggle={menuToggle} />
      <Button onClick={menuToggle(true)}>
        <MenuIcon />
      </Button>
      <Button onClick={() => setChatList(true)}>
        <ThreePIcon />
      </Button>
      <Button onClick={() => setChatList(false)}>
        <GroupsIcon />
      </Button>
    </Aside>
  );
}

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 10px;
  row-gap: 10px;
  background: color-mix(in srgb, ${vars.$colorAside}, #111);
`;

const Icon = css`
  svg {
    font-size: 30px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 5px;
  ${Icon}

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background: #2d364b;
    }
  }
`;
