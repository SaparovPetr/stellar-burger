import { Navigate, useLocation } from 'react-router-dom';
import { selectUser, getIsAuthChecked } from '../../services/slices/userSlice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { useSelector } from 'react-redux';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.state || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('NAVIGATE FROM LOGIN TO INDEX');
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
