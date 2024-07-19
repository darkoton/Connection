import PropTypes from 'prop-types';

export default function Default({ children }) {
  return <div className="default">{children}</div>;
}

Default.propTypes = {
  children: PropTypes.element,
};
