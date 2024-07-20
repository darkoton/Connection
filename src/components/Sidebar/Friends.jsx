import styled from '@emotion/styled';
import {
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Friend from '@/components/Sidebar/Friend';
import Divider from '@/components/ui/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useUserStore from '@/stores/user.js';
import { useEffect, useState } from 'react';
import { getDatas, updateData } from '@/utils/firestore.js';
import { arrayUnion, arrayRemove } from 'firebase/firestore';

export default function Friends() {
  const { user, setUser } = useUserStore();
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [activeInviteAccordion, setActiveInviteAccordion] = useState(false);
  const [activeFriendsAccordion, setActiveFriendsAccordion] = useState(false);

  useEffect(() => {
    async function fetchInvitations() {
      setInvitations(
        await getDatas(['users'], [['uid', 'in', user.invitations]]),
      );
    }

    async function fetchFriends() {
      setFriends(await getDatas(['users'], [['uid', 'in', user.friends]]));
    }

    if (user.invitations.length) {
      fetchInvitations();
    }

    if (user.friends.length) {
      fetchFriends();
    }
  }, [user.invitations, user.friends]);

  useEffect(() => {
    setActiveInviteAccordion(
      localStorage.getItem('invitationsAccordion') == 'true' ? true : false,
    );

    setActiveFriendsAccordion(
      localStorage.getItem('friendsAccordion') == 'true' ? true : false,
    );
  }, []);

  function handleToggleInvite(event, expanded) {
    setActiveInviteAccordion(expanded);
    localStorage.setItem('invitationsAccordion', expanded);
  }

  function handleToggleFriends(event, expanded) {
    setActiveFriendsAccordion(expanded);
    localStorage.setItem('friendsAccordion', expanded);
  }

  function accept(uid) {
    return async () => {
      const newUser = await updateData(['users', user.uid], {
        invitations: arrayRemove(uid),
        friends: arrayUnion(uid),
      });
      await updateData(['users', uid], {
        friends: arrayUnion(user.uid),
      });
      setInvitations(invitations.filter(invite => invite.uid != uid));
      setUser(newUser);
    };
  }

  function reject(uid) {
    return async () => {
      const newUser = await updateData(['users', user.uid], {
        invitations: arrayRemove(uid),
      });
      setInvitations(invitations.filter(invite => invite.uid != uid));
      setUser(newUser);
    };
  }

  return (
    <>
      <AccordionStyled
        expanded={!!(activeInviteAccordion && invitations.length)}
        onChange={handleToggleInvite}
      >
        <AccordionSummaryStyled expandIcon={!!invitations.length && <Icon />}>
          friend invitations ({user.invitations.length})
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <ListStyled>
            {invitations.map(invite => (
              <Friend
                invite
                key={invite.uid}
                user={invite}
                onAccept={accept(invite.uid)}
                onReject={reject(invite.uid)}
              />
            ))}
          </ListStyled>
        </AccordionDetailsStyled>
      </AccordionStyled>

      <Divider size={3} />

      {console.log(!!(activeFriendsAccordion && friends.length))}
      <AccordionStyled
        expanded={!!(activeFriendsAccordion && friends.length)}
        onChange={handleToggleFriends}
      >
        <AccordionSummaryStyled expandIcon={!!friends.length && <Icon />}>
          friend invitations ({user.friends.length})
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <ListStyled>
            {friends.map(friend => (
              <Friend key={friend.uid} user={friend} />
            ))}
          </ListStyled>
        </AccordionDetailsStyled>
      </AccordionStyled>
      {/* <ListStyled>
          <Friend />
        </ListStyled> */}
    </>
  );
}

const AccordionStyled = styled(Accordion)`
  background: transparent;
  &,
  &.Mui-expanded {
    margin: 0;
  }
`;

const AccordionSummaryStyled = styled(AccordionSummary)`
  &,
  &.Mui-expanded {
    min-height: auto;
    /* margin: 5px 0; */
  }
  & .MuiAccordionSummary-content,
  & .MuiAccordionSummary-content.Mui-expanded {
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
