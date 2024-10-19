import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, checkToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then(() => {
          setIsAuthenticated(true);
          // Aquí podrías obtener los datos del usuario si es necesario
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      // Aquí podrías establecer los datos del usuario si los recibes en la respuesta
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login: loginUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
