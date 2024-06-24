import { createContext, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  //   const login = async (data) => {
  //     setUser(data);
  //     navigate('/', { replace: true });
  //   };
  const login = useCallback(
    async (data) => {
      setUser(data);
      navigate('/', { replace: true });
    },
    [navigate, setUser]
  );

  // call this function to sign out logged in user
  //   const logout = () => {
  //     setUser(null);
  //     navigate('/login', { replace: true });
  //   };

  // Function to sign out logged-in user
  const logout = useCallback(() => {
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
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
