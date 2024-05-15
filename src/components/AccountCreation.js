// src/components/AccountCreation.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Appel API pour la création de compte
      const response = await axios.post('http://localhost:8000/users/', {
        username,
        password,
        email,
      });
      if (response.status === 200) {
        navigate('/success');
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
          <div className="field">
            <p>
              Already have an account? <Link to="/login">Login here</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreation;
