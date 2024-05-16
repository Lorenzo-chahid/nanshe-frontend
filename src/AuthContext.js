import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialiser l'état d'authentification à partir du localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    // Écouter les changements d'état et les mettre à jour dans le localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userId', userId);
  }, [isAuthenticated, userId]);

  const login = id => {
    setIsAuthenticated(true);
    setUserId(id); // Définir l'ID utilisateur
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', id);
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null); // Réinitialiser l'ID utilisateur
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
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
