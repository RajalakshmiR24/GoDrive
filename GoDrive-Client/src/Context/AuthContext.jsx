import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('userRole'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('id'),
  });

  const setAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('id', data.id);

    setAuthState(data);
  };

  const removeAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    setAuthState({
      token: null,
      role: null,
      name: null,
      email: null,
      id: null
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
