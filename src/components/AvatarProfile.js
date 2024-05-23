import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AvatarProfile = () => {
  const { avatarId } = useParams();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/avatar/${avatarId}`
        );
        console.log('RESPONSE ::: ', response.data);
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

  const handleSave = async () => {
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

  if (!avatar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ color: '#D76C58', padding: '20px' }}>
      <Link to="/dashboard" style={{ color: '#D76C58' }}>
        Back to Dashboard
      </Link>
      <h1 className="title">
        {avatar.first_name} {avatar.last_name}
      </h1>
      <div>
        <img
          src={avatar.profile_image}
          alt="Avatar"
          style={{ width: '150px', borderRadius: '50%' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button
          className="button is-danger"
          onClick={handleDelete}
          style={{ marginRight: '10px' }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span>Delete</span>
        </button>
        {isEditing ? (
          <button
            className="button is-primary"
            onClick={handleSave}
            style={{ marginRight: '10px' }}
          >
            Save
          </button>
        ) : (
          <button className="button is-link" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div style={{ marginTop: '20px' }}>
          <div className="field">
            <label className="label">Profil Image</label>
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
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Age</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Personality</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Traits</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="traits"
                value={formData.traits}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Writing</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="writing"
                value={formData.writing}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Eye Color</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="eye_color"
                value={formData.eye_color}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Hair Color</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="hair_color"
                value={formData.hair_color}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Weight</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Bust Size</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="bust_size"
                value={formData.bust_size}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p>Age: {avatar.age}</p>
          <p>Gender: {avatar.gender || 'Not specified'}</p>
          <p>Personality: {avatar.personality}</p>
          <p>Traits: {avatar.traits}</p>
          <p>Writing: {avatar.writing}</p>
          <p>Eye Color: {avatar.eye_color}</p>
          <p>Hair Color: {avatar.hair_color}</p>
          <p>Weight: {avatar.weight}</p>
          <p>Bust Size: {avatar.bust_size}</p>
        </div>
      )}
    </div>
  );
};

export default AvatarProfile;
