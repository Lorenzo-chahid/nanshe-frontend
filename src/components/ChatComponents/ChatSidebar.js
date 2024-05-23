import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faSignOutAlt,
  faHome,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import './../css/ChatSidebar.css'; // Assurez-vous de créer et utiliser ce fichier CSS

const ChatSidebar = ({ logout, isOpen, toggleSidebar }) => {
  return (
    <aside className={`chat-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <ul className="menu-list">
        <li>
          <Link to="/dashboard" className="is-active">
            <FontAwesomeIcon icon={faHome} size={isOpen ? 'lg' : '2x'} />
            {isOpen && ' Dashboard'}
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size={isOpen ? 'lg' : '2x'} />
            {isOpen && ' Profile'}
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} size={isOpen ? 'lg' : '2x'} />
            {isOpen && ' Settings'}
          </Link>
        </li>
        <li>
          <a onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} size={isOpen ? 'lg' : '2x'} />
            {isOpen && ' Logout'}
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default ChatSidebar;
