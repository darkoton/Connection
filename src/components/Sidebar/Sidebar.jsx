import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/Sidebar/Header';
import Navigation from '@/components/Sidebar/Navigation';
import ChatsList from '@/components/Sidebar/List';
import Friends from '@/components/Sidebar/Friends';
import useUiStore from '@/stores/ui.js';

export default function Sidebar() {
  const { chatList } = useUiStore();

  return (
    <Aside>
      <Navigation />
      <Body>
        <Header />
        {chatList ? <ChatsList /> : <Friends />}
      </Body>
    </Aside>
  );
}

const Aside = styled.aside`
  width: 400px;
  background: ${vars.$colorAside};
  display: flex;
  user-select: none;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
