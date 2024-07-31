import Divider from '@mui/material/Divider';
import propTypes from 'prop-types';

UiDivider.propTypes = {
  size: propTypes.number,
  sx: propTypes.object,
};

export default function UiDivider({ size, ...props }) {
  return (
    <Divider
      sx={{
        width: '100%',
        height: size,
        background: 'rgba(255, 255, 255, 0.12)',
        ...props.sx,
      }}
    />
  );
}
