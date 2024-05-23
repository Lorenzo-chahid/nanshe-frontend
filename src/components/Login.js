// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from '../img/icon.png'; // Assurez-vous de corriger le chemin vers le logo
import './css/Login.css'; // Assurez-vous de créer ce fichier CSS

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // État pour gérer les erreurs de connexion
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur à chaque tentative de connexion
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/`,
        {
          login,
          password,
        }
      );
      if (response.status === 200) {
        loginUser(response.data.user_id); // Passez l'ID utilisateur à la fonction de connexion
        navigate('/dashboard'); // Rediriger vers le tableau de bord après la connexion
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid login or password');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Nanshe Logo" className="login-logo" />
      <h1 className="login-title">Welcome to Nanshe</h1>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email or Username</label>
            <div className="login-control">
              <input
                className="login-input"
                type="text"
                placeholder="Email or Username"
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
              />
              <span className="login-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-control">
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="login-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          {error && <p className="login-error">{error}</p>}
          <div className="login-field">
            <div className="login-control">
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
          </div>
          <p className="login-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="login-link">
              Create one here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
