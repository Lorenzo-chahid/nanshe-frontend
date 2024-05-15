// src/components/AvatarModal.js
import React, { useState } from 'react';
import axios from 'axios';

const AvatarModal = ({ isOpen, onClose, userId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(25);
  const [personality, setPersonality] = useState('');
  const [traits, setTraits] = useState('');
  const [writing, setWriting] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/avatars/`,
        {
          first_name: firstName,
          last_name: lastName,
          age,
          personality,
          traits,
          writing,
          user_id: userId,
        },
        console.log('Test :: ', `${process.env.REACT_APP_API_URL}/avatars/`)
      );
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error('There was an error creating the avatar!', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name (Optional)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="100"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                />
                <span>{age}</span>
              </div>
            </div>
            <div className="field">
              <label className="label">Personality (Optional)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={personality}
                  onChange={e => setPersonality(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Traits (Optional)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={traits}
                  onChange={e => setTraits(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Writing</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={writing}
                  onChange={e => setWriting(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" type="submit">
                  Create Avatar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default AvatarModal;
