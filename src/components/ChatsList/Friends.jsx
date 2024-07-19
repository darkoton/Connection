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

export default function Friends() {
  return (
    <Aside>
      <Sidebar />
      <Body>
        <Header />
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<Icon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            friend invitations (0)
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <ListStyled>
              <Friend invite />
            </ListStyled>
          </AccordionDetailsStyled>
        </AccordionStyled>

        <Divider size={3} />
        <ListStyled>
          <Friend />
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
