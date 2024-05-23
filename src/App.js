// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Signup from './components/Signup';
import CreateAvatar from './components/CreateAvatar';
import Login from './components/Login';
import Success from './components/Success';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AvatarProfile from './components/AvatarProfile';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/Chat';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/create-avatar" element={<CreateAvatar />} />
        <Route
          path="/create-avatar"
          element={
            <PrivateRoute>
              <CreateAvatar />
            </PrivateRoute>
          }
        />
        <Route
          path="/avatar/:avatarId"
          element={
            <PrivateRoute>
              <AvatarProfile />
            </PrivateRoute>
          }
        />{' '}
        {/* Nouvelle route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:avatarId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
