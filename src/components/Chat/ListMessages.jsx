import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins.js';
import { List } from '@mui/material';
import Message from '@/components/Chat/Message';
export default function ListMessages() {
  return (
    <ListStyled>
      <Message />
    </ListStyled>
  );
}

const ListStyled = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1 1 auto;
  ${mixins.adaptivIndent('padding', 19, 15, 27, 21, 1)}
`;
