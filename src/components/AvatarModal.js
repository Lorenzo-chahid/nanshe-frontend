import React, { useState } from 'react';
import axios from 'axios';

const AvatarModal = ({ isOpen, onClose, userId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(25);
  const [personality, setPersonality] = useState('');
  const [traits, setTraits] = useState('');
  const [writing, setWriting] = useState('');
  const [profileImage, setProfileImage] = useState(''); // State for profile image URL

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
          profile_image: profileImage, // Include profile image in the API request
          user_id: userId,
        }
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
        <div
          className="box"
          style={{ backgroundColor: '#222D41', color: '#D76C58' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                First Name
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Last Name (Optional)
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Age
              </label>
              <div className="control">
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="100"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  style={{ background: '#7F5056' }}
                />
                <span style={{ color: '#D76C58' }}>{age}</span>
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Personality (Optional)
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={personality}
                  onChange={e => setPersonality(e.target.value)}
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Traits (Optional)
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={traits}
                  onChange={e => setTraits(e.target.value)}
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Writing
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={writing}
                  onChange={e => setWriting(e.target.value)}
                  required
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: '#D76C58' }}>
                Profile Image URL
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="http://example.com/image.jpg"
                  value={profileImage}
                  onChange={e => setProfileImage(e.target.value)}
                  style={{
                    backgroundColor: '#11151D',
                    borderColor: '#7F5056',
                    color: '#D76C58',
                  }}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className="button is-link"
                  type="submit"
                  style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
                >
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
        style={{ color: '#7F5056' }}
      ></button>
    </div>
  );
};

export default AvatarModal;
