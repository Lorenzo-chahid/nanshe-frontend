import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Ajoutez l'état pour l'ID utilisateur
  const navigate = useNavigate();

  const login = id => {
    // Passez l'ID utilisateur lors de la connexion
    setIsAuthenticated(true);
    setUserId(id); // Définir l'ID utilisateur
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null); // Réinitialiser l'ID utilisateur
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
