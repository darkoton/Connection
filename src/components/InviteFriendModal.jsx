import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Input,
} from '@mui/material';
import styled from '@emotion/styled';
import propTypes from 'prop-types';
import { updateData } from '@/utils/firestore';
import { useState } from 'react';
import vars from '@/assets/style/modules/vars.js';
import useUserStore from '@/stores/user.js';
import { arrayUnion } from 'firebase/firestore';

InviteFriendModal.propTypes = {
  onClose: propTypes.func,
  open: propTypes.bool,
};

export default function InviteFriendModal({ onClose, open }) {
  const userStore = useUserStore();

  const [tag, setTag] = useState('');
  const [status, setStatus] = useState({
    type: 'ok',
    message: 'ok',
  });

  async function invite() {
    try {
      const tagId = tag.trim().slice(1, tag.trim().length);
      if (tag.trim()[0] != '#') {
        setStatus({ type: 'error', message: 'The # symbol is required' });
        return;
      } else if (tagId.length > 6 || tagId.length < 6) {
        setStatus({ type: 'error', message: 'Tag should be length 6' });
        return;
      }

      setStatus({
        type: 'ok',
        message: 'ok',
      });

      if (tag.trim() != userStore.user.tag) {
        await updateData(
          ['users'],
          {
            invitations: arrayUnion(userStore.user.uid),
          },
          [['tag', '==', tag.trim()]],
        );
      }

      setStatus({
        type: 'success',
        message: 'Invite sent',
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Search friends</DialogTitle>
      <DialogContent>
        <DialogBody>
          <InputStyled
            placeholder="#User tag"
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
          <Button onClick={invite}>Invite to friends</Button>
        </DialogBody>
        {status.type == 'error' && <Error>{status.message}</Error>}
        {status.type == 'success' && <Success>{status.message}</Success>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

const InputStyled = styled(Input)`
  font-size: 20px;
`;

const DialogBody = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const Error = styled.div`
  color: ${vars.$colorError};
  margin-top: 10px;
  font-size: 16px;
`;

const Success = styled.div`
  color: ${vars.$colorSuccess};
  margin-top: 10px;
  font-size: 16px;
`;
