import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/ChatList/Header';
import { List } from '@mui/material';
import ChatListItem from '@/components/ChatList/Item';
import Sidebar from '@/components/ChatList/Sidebar';

export default function ChatList() {
  return (
    <Aside>
      <Sidebar />
      <Body>
        <Header />
        <ListStyled>
          <ChatListItem />
        </ListStyled>
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
`;

const ListStyled = styled(List)`
  width: 100%;
`;
