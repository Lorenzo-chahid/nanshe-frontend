import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Chat = () => {
  const { avatarId } = useParams();
  const { logout, user } = useAuth(); // Assuming `user` contains the user's profile details
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatarDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/avatars/${avatarId}`
        );
        setAvatar(response.data);
      } catch (error) {
        console.error('There was an error fetching the avatar details!', error);
      }
    };

    const fetchConversationHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/conversations/${avatarId}`
        );
        console.log('HERE :: ', response.data);
        const fetchedMessages = response.data
          .map(conversation => [
            {
              text: conversation.user_message,
              sender: 'user',
              image: user?.user_image,
            },
            {
              text: conversation.avatar_response,
              sender: 'avatar',
              image: avatar?.avatar_image,
            },
          ])
          .flat();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error(
          'There was an error fetching the conversation history!',
          error
        );
      }
    };

    fetchAvatarDetails();
    fetchConversationHistory();
  }, [avatarId, user]);

  const handleSendMessage = async e => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        sender: 'user',
        image:
          'https://img.freepik.com/photos-gratuite/jeune-belle-femme-pull-chaud-rose-aspect-naturel-souriant-portrait-isole-cheveux-longs_285396-896.jpg?w=1800&t=st=1715885498~exp=1715886098~hmac=b9963f50df388ad26f3b25d52e87477b1051b7c5f8e5ddfdf37ad6a04d86cf41',
      };
      setMessages([...messages, newMessage]);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/chat/`,
          {
            avatar_id: avatarId,
            user_message: message,
          }
        );

        const aiMessage = {
          text: response.data.avatar_response,
          sender: 'avatar',
          image: avatar?.profile_image,
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
                display: 'flex',
                justifyContent:
                  msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <img
                src={msg.image}
                alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  margin: '0 10px',
                }}
              />
              <div
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                  maxWidth: '60%',
                }}
              >
                {msg.text}
              </div>
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
