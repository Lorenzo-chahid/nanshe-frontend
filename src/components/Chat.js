import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import ChatSidebar from './ChatComponents/ChatSidebar';
import ChatMessage from './ChatComponents/ChatMessage';
import ChatInput from './ChatComponents/ChatInput';
import TypingIndicator from './TypingIndicator';

const Chat = () => {
  const { avatarId } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState([]);
  const [recording, setRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const playAudio = async text => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/text-to-speech/`,
        { text: text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );
      const audioUrl = URL.createObjectURL(
        new Blob([response.data], { type: 'audio/mpeg' })
      );
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
        const fetchedMessages = response.data
          .map(conversation => [
            {
              text: conversation.user_message,
              sender: 'user',
              image: '',
              seen: true,
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

  // Function to get the profile image of the avatar
  const getAvatarProfileImage = id => {
    const matchedAvatar = avatar.find(av => av.id === parseInt(id));
    return matchedAvatar ? matchedAvatar.profile_image : '';
  };

  const handleSendMessage = async e => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        sender: 'user',
        image: '',
        seen: false,
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');

      // Simulate AI typing
      setTimeout(async () => {
        setIsTyping(true);
        scrollToBottom();
        setTimeout(async () => {
          setIsTyping(false);

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
              image: getAvatarProfileImage(avatarId), // Use the utility function here
            };

            setMessages(prevMessages => [...prevMessages, aiMessage]);
          } catch (error) {
            console.error(
              'There was an error communicating with the AI!',
              error
            );
          }
        }, Math.random() * (10000 - 4000) + 4000);
      }, Math.random() * (5000 - 2000) + 2000);
    }
  };

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/upload/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const fileMessage = {
          text: response.data.file_url,
          sender: 'user',
          image: '',
          type: 'file',
        };
        setMessages(prevMessages => [...prevMessages, fileMessage]);
      } catch (error) {
        console.error('There was an error uploading the file!', error);
      }
    }
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = async recordedBlob => {
    setRecording(false);
    const formData = new FormData();
    formData.append('audio', recordedBlob.blob);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload-audio/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const audioMessage = {
        text: response.data.audio_url,
        sender: 'user',
        image: '',
        type: 'audio',
      };
      setMessages(prevMessages => [...prevMessages, audioMessage]);
    } catch (error) {
      console.error('There was an error uploading the audio!', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="container is-fluid"
      style={{ display: 'flex', height: '100vh' }}
    >
      <ChatSidebar logout={logout} />
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
            <ChatMessage
              key={index}
              message={msg}
              playAudio={playAudio}
              onClickAvatar={() => navigate(`/avatar/${avatarId}`)}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleFileUpload={handleFileUpload}
          handleStartRecording={handleStartRecording}
          handleStopRecording={handleStopRecording}
          recording={recording}
        />
      </div>
    </div>
  );
};

export default Chat;
