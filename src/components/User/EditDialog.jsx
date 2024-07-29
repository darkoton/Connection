import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import propTypes from 'prop-types';
import useUserStore from '@/stores/user';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Avatar from '@/components/User/Avatar';
import styled from '@emotion/styled';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadFile, deleteFile } from '@/utils/storage';
import { updateData } from '@/utils/firestore';

EditModal.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func,
};

export default function EditModal({ open, onClose }) {
  const { user, setUser } = useUserStore();
  const [userForm, setUserForm] = useState(user);
  const [avatarFile, setAvatarFile] = useState();
  const [avatarDelete, setAvatarDelete] = useState(false);

  const setDisplayName = () => e =>
    setUserForm({ ...userForm, displayName: e.target.value });

  const setPhone = () => e =>
    setUserForm({ ...userForm, phoneNumber: e.target.value });

  const selectAvatar = e => {
    const file = e.target.files[0];
    setAvatarDelete(false);

    if (!FileReader) {
      return;
    }

    if (!file) {
      setAvatarDelete(true);
      setAvatarFile(null);
      setUserForm({ ...userForm, photoURL: null });

      return;
    }

    setAvatarFile(file);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setUserForm({ ...userForm, photoURL: fileReader.result });
    };

    fileReader.readAsDataURL(file);
  };

  const confirm = async () => {
    const newUserData = userForm;
    if (avatarFile) {
      await deleteFile([user.photoURL]);
      const [url] = await uploadFile(['avatars'], [avatarFile]);
      newUserData.photoURL = url;
    } else if (avatarDelete) {
      await deleteFile([user.photoURL]);
    }

    await updateData(['users', user.uid], newUserData);
    await updateData(
      ['chats'],
      {
        ['users.' + [user.uid]]: newUserData,
      },
      { wheres: [['pair', 'array-contains', user.uid]] },
    );

    setUser(newUserData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit profile</DialogTitle>
      <DialogContentStyled sx={{ overflow: 'visible' }}>
        <UploadAvatar>
          <UploadLabel htmlFor="avatar">
            <Avatar src={userForm.photoURL} size={80} />
            <UploadIconStyled />
          </UploadLabel>
          <InputFile
            type="file"
            name="avatar"
            id="avatar"
            onChange={selectAvatar}
            accept=".png, .jpg, .jpeg, .webp, .avif, .heic, .gif"
          />
        </UploadAvatar>
        <Input
          id="username"
          placeholder="Username"
          value={userForm.displayName}
          onChange={setDisplayName()}
        />
        <Input
          id="phone"
          placeholder="Phone"
          value={userForm.phoneNumber || ''}
          onChange={setPhone()}
        />
      </DialogContentStyled>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={confirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 15px;
`;

const UploadLabel = styled.label`
  cursor: pointer;
`;

const UploadAvatar = styled.div`
  position: relative;

  .avatar {
    transition: all 0.3s ease 0s;
  }

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      & svg {
        opacity: 1;
      }

      & .avatar {
        filter: brightness(0.5);
      }
    }
  }
`;

const UploadIconStyled = styled(UploadIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  opacity: 0;
  z-index: 2;
`;

const InputFile = styled.input`
  display: none;
`;
