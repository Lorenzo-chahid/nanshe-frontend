// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Chat = () => {
  const { avatarId } = useParams();
  const { logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/avatars/${avatarId}`
        );
        setAvatar(response.data);
      } catch (error) {
        console.error('There was an error fetching the avatar details!', error);
      }
    };

    fetchAvatarDetails();
  }, [avatarId]);

  const handleSendMessage = async e => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = { text: message, sender: 'user' };
      setMessages([...messages, newMessage]);

      try {
        const response = await axios.post('http://localhost:8000/chat/', {
          avatar_id: avatarId,
          user_message: message,
        });

        const aiMessage = {
          text: response.data.avatar_response,
          sender: 'avatar',
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('There was an error communicating with the AI!', error);
      }

      setMessage('');
    }
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
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '10px',
                  borderRadius: '10px',
                  background: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                  maxWidth: '60%',
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          style={{ display: 'flex', marginTop: '10px' }}
        >
          <input
            className="input"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message"
            style={{ flex: 1, marginRight: '10px' }}
          />
          <button className="button is-link" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
