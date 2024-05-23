// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <p>&copy; 2024 Nanshe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
