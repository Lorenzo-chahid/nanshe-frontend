import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Chat = () => {
  const { avatarId } = useParams();
  const { logout, user } = useAuth(); // Assuming `user` contains the user's profile details
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(null);

  const playAudio = async text => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/text-to-speech/`,
        { text: text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important for handling binary data as audio
        }
      );
      console.log(response.data);
      const audioUrl = URL.createObjectURL(
        new Blob([response.data], { type: 'audio/mpeg' })
      );
      console.log(audioUrl);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error playing the text:', error);
    }
  };

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
              image:
                'https://img.freepik.com/photos-premium/personne-dans-carre-qui-personne-dans-cadre_825862-296.jpg',
            },
            {
              text: conversation.avatar_response,
              sender: 'avatar',
              image: conversation.avatar_image,
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
          'https://img.freepik.com/photos-premium/personne-dans-carre-qui-personne-dans-cadre_825862-296.jpg',
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
          image: response.data.avatar_image,
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
                {msg.sender === 'avatar' && (
                  <button onClick={() => playAudio(msg.text)}>
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                )}
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
