import useAuthStore from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export default function protectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return null;

  if (!user) {
    alert('로그인이 필요한 서비스입니다.');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
