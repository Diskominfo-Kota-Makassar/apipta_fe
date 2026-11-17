import { useEffect } from 'react';
import { useAuth } from 'src/routes/hooks/useAuth';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
