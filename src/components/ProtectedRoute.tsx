import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = () => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
