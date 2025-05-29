import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('x-token'));

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("x-token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (email, password) => {
  setIsLoading(true);
  try {
    const result = await authService.login(email, password);
    console.log('Login result:', result);
    console.log('Login result token:', result.userDetails.token);
    if (result?.userDetails.token) {
      localStorage.setItem('x-token', result.userDetails.token);
      setIsLoggedIn(true); 
      console.log('Login exitoso, setIsLoggedIn(true)');
    }
    return result;
    
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('x-token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};