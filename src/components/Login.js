import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // État pour gérer les erreurs de connexion
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur à chaque tentative de connexion
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/`,
        {
          login,
          password,
        }
      );
      if (response.status === 200) {
        loginUser(response.data.user_id); // Passez l'ID utilisateur à la fonction de connexion
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid login or password');
      } else {
        setError('An error occurred. Please try again.');
      }
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
          {error && <p className="help is-danger">{error}</p>}{' '}
          {/* Afficher l'erreur ici */}
          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Login
              </button>
            </div>
          </div>
          <p style={{ marginTop: '20px' }}>
            Don't have an account? <Link to="/signup">Create one here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
