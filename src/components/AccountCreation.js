import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'react-bulma-components';
import logo from '../img/icon.png'; // Make sure the path to your logo image is correct

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const profile_image = '';
  const premium = false;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/`,
        {
          username,
          password,
          email,
          profile_image,
          premium,
        }
      );
      if (response.status === 200) {
        setShowModal(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('There was an error creating the account!', error);
    }
  };

  return (
    <div
      className="container is-max-desktop"
      style={{
        marginTop: '50px',
        textAlign: 'center',
        backgroundColor: '#222D41',
        color: '#D76C58',
      }}
    >
      <img
        src={logo}
        alt="Nanshe Logo"
        style={{ width: '100px', margin: '20px' }}
      />
      <h1 className="title" style={{ color: '#7F5056' }}>
        Welcome to Nanshe
      </h1>
      <p style={{ margin: '20px', fontSize: '1.2rem' }}>
        Create roleplay discussions with an AI that acts in the role you desire.
      </p>
      <div
        className="box"
        style={{
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#F5F5F5',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                type="submit"
                style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
              >
                Create Account
              </button>
            </div>
          </div>
          <div className="field">
            <p style={{ color: '#D76C58' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#D76C58' }}>
                Login here
              </Link>
              .
            </p>
          </div>
          {showModal && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content>
                <div
                  className="notification is-primary"
                  style={{ backgroundColor: '#7F5056' }}
                >
                  Congratulations! Your account has been created successfully.
                </div>
              </Modal.Content>
            </Modal>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountCreation;
