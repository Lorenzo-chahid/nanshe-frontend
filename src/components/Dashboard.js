// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faSignOutAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import AvatarModal from './AvatarModal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);

  const fetchAvatars = async () => {
    try {
      const response = await axios.get(
        'https://nanshe-backend.onrender.com/avatars/1'
      ); // Remplacez 1 par l'ID utilisateur réel
      setAvatars(response.data);
    } catch (error) {
      console.error('There was an error fetching the avatars!', error);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchAvatars(); // Refresh avatars list after closing modal
  };

  return (
    <div
      className="container is-fluid"
      style={{ display: 'flex', height: '100vh' }}
    >
      <aside
        className="menu"
        style={{ width: '250px', background: '#f5f5f5', padding: '20px' }}
      >
        <ul className="menu-list">
          <li>
            <a className="is-active">
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
          </li>
          <li>
            <a>
              <FontAwesomeIcon icon={faCog} /> Settings
            </a>
          </li>
          <li>
            <a onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </li>
        </ul>
      </aside>
      <div style={{ flex: 1, padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <button className="button is-primary" onClick={handleOpenModal}>
            <span className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span>Create Avatar</span>
          </button>
          <div style={{ marginLeft: '20px' }}>
            <h2 className="title is-4">My Avatars</h2>
            <ul>
              {avatars.map(avatar => (
                <li key={avatar.id}>
                  <Link to={`/chat/${avatar.id}`}>
                    {avatar.first_name} {avatar.last_name} (Age: {avatar.age})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <AvatarModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={1 /* Replace with actual user ID */}
        />
      </div>
    </div>
  );
};

export default Dashboard;
