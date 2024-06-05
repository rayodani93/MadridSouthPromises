import { useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthProvider';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { session, user } = useAuth();

  if (!session) {
    return <Navigate to="/login" />;
  }

  if (user?.email !== 'rayodani93@gmail.com') { 
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;