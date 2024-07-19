import { Avatar } from '@mui/material';
import useUserStore from '@/stores/user.js';
import propTypes from 'prop-types';

UserAvatar.propTypes = {
  sx: propTypes.object,
  user: propTypes.object,
  size: propTypes.number,
};

export default function UserAvatar({ user, size = 60, ...props }) {
  const { user: currentUser } = useUserStore();

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function propsAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...props.sx,
        width: size,
        height: size,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <Avatar
      src={(user && user.photoURL) || (currentUser && currentUser.photoURL)}
      {...props}
      {...((user && propsAvatar(user.displayName)) ||
        (currentUser && propsAvatar(currentUser.displayName)))}
    />
  );
}
