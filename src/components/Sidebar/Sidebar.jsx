import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/Sidebar/Header';
import Navigation from '@/components/Sidebar/Navigation';
import { Outlet } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Aside>
      <Navigation />
      <Body>
        <Header />
        <Outlet />
      </Body>
    </Aside>
  );
}

const Aside = styled.aside`
  width: 400px;
  background: ${vars.$colorAside};
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
