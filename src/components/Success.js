// src/components/Success.js
import React from 'react';

const Success = message => {
  return (
    <div className="container is-max-desktop" style={{ marginTop: '50px' }}>
      <div className="notification is-primary">
        Félicitations ! créé avec succès 🥳.
      </div>
    </div>
  );
};

export default Success;
