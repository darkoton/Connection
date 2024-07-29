import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/components/Auth/AuthContext';
import PropsType from 'prop-types';
import useUserStore from '@/stores/user';
import Loading from '@/components/Loading';

ProtectedRoute.propTypes = {
  children: PropsType.element,
};

export default function ProtectedRoute({ children: Component }) {
  const { user } = useUserStore();
  return (
    <>
      {user !== null ? (
        <>{user ? <>{Component}</> : <Loading size={100}>Loading</Loading>}</>
      ) : (
        <Navigate to="/authentication" />
      )}
    </>
  );
}
