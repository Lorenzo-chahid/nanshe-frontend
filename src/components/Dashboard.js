import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faSignOutAlt,
  faPlus,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import AvatarModal from './AvatarModal';
import CardComponent from './CardComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/icon.png'; // Assurez-vous de corriger le chemin vers le logo

const Dashboard = () => {
  const { logout, userId } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);

  const fetchAvatars = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/avatars/${userId}`
      );
      setAvatars(response.data);
    } catch (error) {
      console.error('There was an error fetching the avatars!', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAvatars();
    }
  }, [userId]);

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
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#222D41', // Arrière-plan sombre comme dans Login
        color: '#D76C58', // Couleur du texte pour le style uniforme
      }}
    >
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
      <div style={{ flex: 1, padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <button
            className="button is-primary"
            onClick={handleOpenModal}
            style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span>Create Avatar</span>
          </button>
          <div style={{ marginLeft: '20px' }}>
            <h2 className="title is-4" style={{ color: '#D76C58' }}>
              My Avatars
            </h2>
            <ul>
              {avatars.map(avatar => (
                <li key={avatar.id} style={{ color: '#D76C58' }}>
                  <Link to={`/chat/${avatar.id}`} style={{ color: '#D76C58' }}>
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
          userId={userId}
        />
        <CardComponent
          avatars={avatars}
          onAvatarClick={avatarId => {
            console.log('Avatar clicked:', avatarId);
            // Vous pouvez ajouter une logique supplémentaire ici si nécessaire
          }}
          runAdventure={() => {
            console.log('Adventure started!');
            // Ajoutez ici la logique pour démarrer l'aventure
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
