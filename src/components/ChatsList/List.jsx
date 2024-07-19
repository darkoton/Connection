import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/ChatsList/Header';
import { List } from '@mui/material';
import ChatsListItem from '@/components/ChatsList/Item';
import Sidebar from '@/components/ChatsList/Sidebar';

export default function Chats() {
  return (
    <Aside>
      <Sidebar />

      <Body>
        <Header />
        <ListStyled>
          <ChatsListItem />
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
