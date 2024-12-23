import { useAppSelector } from '@/hooks/useAppStore';
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const { user } = useAppSelector(x => x.auth);
  if (user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default AuthLayout