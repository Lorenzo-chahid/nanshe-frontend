import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SkillTree from './SkillTree'; // Importation du composant SkillTree
import './css/AvatarProfile.css'; // Assurez-vous de créer et utiliser ce fichier CSS

const AvatarProfile = () => {
  const { avatarId } = useParams();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    personality: '',
    traits: '',
    writing: '',
    profile_image: '',
    eye_color: '',
    hair_color: '',
    weight: '',
    bust_size: '',
    user_id: '',
    experience: '',
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/avatar/${avatarId}`
        );
        setAvatar(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('There was an error fetching the avatar details!', error);
      }
    };

    fetchAvatar();
  }, [avatarId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/avatar/${avatarId}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('There was an error deleting the avatar!', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/avatar/${avatarId}`,
        formData
      );
      setAvatar(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the avatar!', error);
    }
  };

  const calculateExperiencePercentage = (experience, level) => {
    const levelExp = level ** 2 * 20;
    return Math.min((experience / levelExp) * 100, 100);
  };

  const renderInfoTab = () => (
    <>
      {isEditing ? (
        <form onSubmit={handleSave} className="edit-form">
          <div className="field">
            <label className="label">Profile Image</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="profile_image"
                value={formData.profile_image}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {Object.keys(formData).map(
            (key, index) =>
              key !== 'profile_image' && (
                <div className="field" key={index}>
                  <label className="label">{key.replace('_', ' ')}</label>
                  <div className="control">
                    <input
                      className="input"
                      type={
                        key === 'age' || key === 'weight' ? 'number' : 'text'
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )
          )}
          <div className="action-buttons">
            <button className="button is-primary" type="submit">
              <span className="icon">
                <FontAwesomeIcon icon={faSave} />
              </span>
              <span>Save</span>
            </button>
            <button
              type="button"
              className="button is-link"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="details-container">
          {Object.keys(avatar).map(
            (key, index) =>
              key !== 'id' &&
              key !== 'user_id' &&
              key !== 'profile_image' && (
                <p key={index}>
                  <strong>{key.replace('_', ' ')}:</strong> {avatar[key]}
                </p>
              )
          )}
          <div className="action-buttons">
            <button className="button is-danger" onClick={handleDelete}>
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span>Delete</span>
            </button>
            <button
              className="button is-link"
              onClick={() => setIsEditing(true)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span>Edit</span>
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderSkillsTab = () => (
    <div className="skills-container">
      <h2>Level:</h2>
      <div className="level-circle">
        <span>{avatar.level}</span>
      </div>
      <div className="experience-bar">
        <div
          className="experience-bar-fill"
          style={{
            width: `${calculateExperiencePercentage(
              avatar.experience,
              avatar.level
            )}%`,
          }}
        ></div>
      </div>
      <p>Experience: {avatar.experience}</p>
      <p>Relationship Status: {avatar.relationship_status}</p>
      <SkillTree avatar={avatar} />
    </div>
  );

  if (!avatar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="avatar-profile-container">
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
      <h1 className="title">
        {avatar.first_name} {avatar.last_name}
      </h1>
      <div className="avatar-image-container">
        <img src={avatar.profile_image} alt="Avatar" className="avatar-image" />
      </div>
      <div className="tabs">
        <ul>
          <li
            className={activeTab === 'info' ? 'is-active' : ''}
            onClick={() => setActiveTab('info')}
          >
            <a>Info</a>
          </li>
          <li
            className={activeTab === 'skills' ? 'is-active' : ''}
            onClick={() => setActiveTab('skills')}
          >
            <a>Skills</a>
          </li>
        </ul>
      </div>
      <div className="form-container">
        {activeTab === 'info' ? renderInfoTab() : renderSkillsTab()}
      </div>
    </div>
  );
};

export default AvatarProfile;
