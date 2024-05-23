import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faSignOutAlt,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../img/icon.png'; // Assurez-vous de corriger le chemin vers le logo
import { useAuth } from '../AuthContext';

const Sidebar = ({ logout }) => {
  return (
    <aside
      className="menu"
      style={{
        width: '250px',
        background: '#f5f5f5',
        padding: '20px',
      }}
    >
      <img
        src={logo}
        alt="Nanshe Logo"
        style={{ width: '100px', margin: '10px auto' }}
      />
      <ul className="menu-list">
        <li>
          <Link
            to="/dashboard"
            className="is-active"
            style={{ color: '#7F5056' }}
          >
            <FontAwesomeIcon icon={faHome} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{ color: '#7F5056' }}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" style={{ color: '#7F5056' }}>
            <FontAwesomeIcon icon={faCog} /> Settings
          </Link>
        </li>
        <li>
          <a onClick={logout} style={{ color: '#7F5056' }}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
