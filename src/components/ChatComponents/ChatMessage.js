import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';

const ChatMessage = ({ message, playAudio, onClickAvatar }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      {message.sender !== 'user' && (
        <img
          src={message.image}
          alt="Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            margin: '0 10px',
            cursor: 'pointer',
          }}
          onClick={onClickAvatar}
        />
      )}
      <div
        style={{
          padding: '10px',
          borderRadius: '10px',
          background: message.sender === 'user' ? '#d1e7dd' : '#f8d7da',
          maxWidth: '60%',
          position: 'relative',
        }}
      >
        {message.type === 'file' ? (
          <a href={message.text} target="_blank" rel="noopener noreferrer">
            {message.text}
          </a>
        ) : message.type === 'audio' ? (
          <ReactAudioPlayer src={message.text} controls />
        ) : (
          message.text
        )}
        {message.sender === 'avatar' && (
          <button
            onClick={() => playAudio(message.text)}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
      {message.sender === 'user' && message.seen && (
        <span
          style={{ marginLeft: '10px', fontSize: '12px', color: '#7F5056' }}
        >
          Seen
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
