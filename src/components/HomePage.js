import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Assurez-vous de créer ce fichier CSS
import logo from '../img/icon.png';

const HomePage = () => {
  return (
    <div>
      <div className="jumbotron">
        <div className="overlay"></div> {/* Ajout du voile */}
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="logo" />
          <h1 className="app-title">Nanshe</h1>
        </div>
        <div className="header-content">
          <h1 className="app-title">Nanshe</h1>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
        <div className="title-container">
          <h2 className="main-title">Create your perfect conversation</h2>
        </div>
        <p className="intro-text">
          Experience the future of communication with our cutting-edge AI.
          Engage in conversations that are not only seamless but also incredibly
          engaging. Perfect for both personal and professional interactions.
        </p>
      </div>
      {/* Additional content will go here */}
    </div>
  );
};

export default HomePage;
