import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/Sidebar/Header';
import Navigation from '@/components/Sidebar/Navigation';
import ChatsList from '@/components/Sidebar/List';
import Friends from '@/components/Sidebar/Friends';
import useUiStore from '@/stores/ui';

export default function Sidebar() {
  const { chatList, sidebar } = useUiStore();

  return (
    <Aside sidebar={sidebar}>
      <Navigation />
      <Body>
        <Header />
        {chatList ? <ChatsList /> : <Friends />}
      </Body>
    </Aside>
  );
}

const Aside = styled.aside`
  width: 100%;
  max-width: 400px;
  background: ${vars.$colorAside};
  display: flex;
  user-select: none;
  @media (max-width: 960px) {
    max-width: 100%;
    ${({ sidebar }) => !sidebar && 'display:none;'}
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;
