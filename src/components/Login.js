// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [login, setLogin] = useState(''); // Single field for email or username
  const [password, setPassword] = useState('');
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://nanshe-backend.onrender.com/login/',
        {
          login,
          password,
        }
      );
      if (response.status === 200) {
        loginUser();
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
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
            <label className="label">Email or Username</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Email or Username"
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
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
                Login
              </button>
            </div>
          </div>
        </form>
        <p style={{ marginTop: '20px' }}>
          Don't have an account? <Link to="/signup">Create one here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
