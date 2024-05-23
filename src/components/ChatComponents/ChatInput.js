import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmile,
  faPaperclip,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  handleFileUpload,
  handleStartRecording,
  handleStopRecording,
  recording,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddEmoji = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        style={{
          marginRight: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faSmile} size="1x" />
      </button>
      <input
        className="input"
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{
          flex: 1,
          marginRight: '10px',
          height: '40px',
          minWidth: '60%',
          padding: '0 10px',
          fontSize: '1rem',
        }}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <label
        htmlFor="fileInput"
        style={{
          marginRight: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faPaperclip} size="1x" />
      </label>
      <button
        type="button"
        onClick={handleStartRecording}
        style={{
          marginRight: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faMicrophone} size="1x" />
      </button>
      <button
        className="button is-link"
        type="submit"
        style={{
          height: '40px',
          padding: '0 20px',
          fontSize: '1rem',
        }}
      >
        Send
      </button>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleAddEmoji}
          pickerStyle={{
            position: 'absolute',
            bottom: '60px',
            right: '20px',
          }}
        />
      )}
    </form>
  );
};

export default ChatInput;
