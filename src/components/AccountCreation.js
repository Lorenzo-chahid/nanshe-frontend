import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bulma-components';

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const profile_image = '';
  const premium = false;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
          navigate('/dashboard'); // Redirect to dashboard after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('There was an error creating the account!', error);
    }
  };

  return (
    <div className="container is-max-desktop" style={{ marginTop: '50px' }}>
      <div
        className="box"
        style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
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
              <button className="button is-link" type="submit">
                Create Account
              </button>
            </div>
          </div>
          {showModal && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content>
                <div className="notification is-primary">
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
