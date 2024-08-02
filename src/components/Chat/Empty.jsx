import vars from '@/assets/style/modules/vars';
import styled from '@emotion/styled';

export default function Empty() {
  return <EmptyStyled>Choose who you would like to write to</EmptyStyled>;
}

const EmptyStyled = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: ${vars.$colorMain};

  @media (max-width: 960px) {
    display: none;
  }
`;
