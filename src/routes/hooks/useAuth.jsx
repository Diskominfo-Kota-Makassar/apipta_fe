import { createContext, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data) => {
      setUser(data);
      if (data?.token) {
        try {
          window.localStorage.setItem('token', data.token);
        } catch (e) {
          // ignore
        }
      }
      navigate('/', { replace: true });
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
    } catch (e) {
      // ignore
    }
    navigate('/login', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      token: user?.token || null,
      isAuthenticated: !!(user && (user.token || user.user_id)),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
