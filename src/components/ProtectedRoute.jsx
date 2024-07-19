import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropsType from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropsType.element,
};

const ProtectedRoute = ({ children: Component }) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/authentication" />;
};

export default ProtectedRoute;
