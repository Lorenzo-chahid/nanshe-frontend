import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AvatarList from './AvatarList';
import CreateAvatarButton from './CreateAvatarButton';
import CardComponent from './CardComponent';
import ChatSidebar from './ChatComponents/ChatSidebar';
import './css/Dashboard.css'; // Assurez-vous de créer et utiliser ce fichier CSS

const Dashboard = () => {
  const { logout, userId } = useAuth();
  const [avatars, setAvatars] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

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

  const handleCreateAvatar = () => {
    navigate('/create-avatar');
  };

  const handleFavorite = async avatarId => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/avatars/${avatarId}/favorite`
      );
      fetchAvatars();
    } catch (error) {
      console.error('There was an error favoriting the avatar!', error);
    }
  };

  const handleEdit = avatarId => {
    navigate(`/edit-avatar/${avatarId}`);
  };

  const handleDelete = async avatarId => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/avatar/${avatarId}`);
      navigate('/dashboard');
      fetchAvatars();
    } catch (error) {
      console.error('There was an error deleting the avatar!', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`dashboard-container ${
        isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <ChatSidebar
        logout={logout}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-content">
        <div className="content-header">
          <CreateAvatarButton onCreate={handleCreateAvatar} />
        </div>
        <AvatarList
          avatars={avatars}
          onFavorite={handleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CardComponent
          avatars={avatars}
          onAvatarClick={avatarId => {
            console.log('Avatar clicked:', avatarId);
          }}
          runAdventure={() => {
            console.log('Adventure started!');
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
