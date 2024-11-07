import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userInfo, setUserInfo] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const updateUserInfo = (info) => {
    setUserInfo(info);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userInfo, 
      login, 
      logout, 
      updateUserInfo 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};