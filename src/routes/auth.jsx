import styled from '@emotion/styled';
import Form from '@/components/Auth/Form';

export default function Auth() {
  return (
    <Page>
      <Form />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  padding: 0 10px;
`;
