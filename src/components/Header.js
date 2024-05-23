// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/icon.png';
import './css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="App Logo" className="logo" />
      <div className="auth-buttons">
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
