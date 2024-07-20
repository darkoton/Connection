import styled from '@emotion/styled';
import { List } from '@mui/material';
import ChatsListItem from '@/components/Sidebar/Item';

export default function Chats() {
  return (
    <ListStyled>
      <ChatsListItem />
    </ListStyled>
  );
}

const ListStyled = styled(List)`
  width: 100%;
`;
