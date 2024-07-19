import styled from '@emotion/styled';
import vars from '@/assets/style/modules/vars';
import Header from '@/components/ChatsList/Header';
import {
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Friend from '@/components/ChatsList/Friend';
import Sidebar from '@/components/ChatsList/Sidebar';
import Divider from '@/components/ui/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useUserStore from '@/stores/user.js';
import { useEffect, useState } from 'react';
import { getDatas } from '@/utils/firestore.js';

export default function Friends() {
  const { user } = useUserStore();
  const [invitations, setInvitions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setInvitions(
        await getDatas(['users'], [['uid', 'in', user.invitations]]),
      );
    }

    if (user.invitations.length) {
      fetchData();
    }
  }, [user.invitations]);
  return (
    <Aside>
      <Sidebar />
      <Body>
        <Header />
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<Icon />}>
            friend invitations ({user.invitations.length})
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <ListStyled>
              {invitations.map(user => (
                <Friend invite key={user.uid} user={user} />
              ))}
            </ListStyled>
          </AccordionDetailsStyled>
        </AccordionStyled>

        <Divider size={3} />
        {/* <ListStyled>
          <Friend />
        </ListStyled> */}
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

const AccordionStyled = styled(Accordion)`
  background: transparent;
`;

const AccordionSummaryStyled = styled(AccordionSummary)`
  &,
  &.Mui-expanded {
    min-height: auto;
  }

  & div,
  & .Mui-expanded {
    margin: 5px 0;
  }
`;

const Icon = styled(ExpandMoreIcon)`
  font-size: 25px;
`;

const AccordionDetailsStyled = styled(AccordionDetails)`
  padding: 0;
`;

const ListStyled = styled(List)`
  width: 100%;
`;
