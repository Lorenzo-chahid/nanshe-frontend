// src/pages/HomePage.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Header from '../components/Header';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './css/HomePage.css';
import featureImage1 from '../img/icon.png';
import featureImage2 from '../img/icon.png';
import featureImage3 from '../img/icon.png';

const HomePage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  const createStars = numStars => {
    const stars = [];
    const colors = ['star-blue', 'star-red', 'star-yellow'];
    for (let i = 0; i < numStars; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      stars.push(
        <div
          key={i}
          className={`star ${color}`}
          style={{ top: `${top}%`, left: `${left}%` }}
        />
      );
    }
    return stars;
  };

  const createShootingStars = numStars => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 60 + 's'; // Less frequent
      stars.push(
        <div
          key={`shooting-${i}`}
          className="shooting-star"
          style={{ top: `${top}%`, left: `${left}%`, animationDelay: delay }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="home-page">
      <Header />
      <animated.div style={fadeIn} className="jumbotron">
        <div className="image-overlay"></div>
        <div className="overlay">
          {createStars(100)}
          {createShootingStars(3)}
        </div>
        <div className="title-container">
          <h1 className="app-title">Nanshe</h1>
          <h2 className="main-title">Create your perfect conversation</h2>
          <p className="intro-text">
            Experience the future of communication with our cutting-edge AI.
            Engage in conversations that are not only seamless but also
            incredibly engaging. Perfect for both personal and professional
            interactions.
          </p>
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </div>
      </animated.div>

      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <Feature
          image={featureImage1}
          title="Roleplay Scenarios"
          description="Create immersive roleplay scenarios with AI-driven characters. From mentors to friends, customize your interactions to suit your needs."
        />
        <Feature
          image={featureImage2}
          title="Quests and Gamification"
          description="Complete quests and earn rewards. Our gamification system makes learning and interaction fun and engaging."
          reverse
        />
        <Feature
          image={featureImage3}
          title="Personalized Coaching"
          description="Get personalized coaching from AI mentors. Whether you need help with personal development or professional advice, we have you covered."
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
