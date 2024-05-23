import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faSignOutAlt,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext';

const ChatSidebar = ({ logout }) => {
  return (
    <aside
      className="menu"
      style={{ width: '250px', background: '#f5f5f5', padding: '20px' }}
    >
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

export default ChatSidebar;
