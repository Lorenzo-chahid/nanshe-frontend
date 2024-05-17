import React from 'react';
import './CardComponent.css'; // Assurez-vous de créer ce fichier CSS

const CardComponent = ({ avatars, onAvatarClick, runAdventure }) => {
  return (
    <div className="card">
      <div className="card-header">Run roleplay adventure</div>
      <div className="card-avatars">
        {avatars.slice(0, 3).map((avatar, index) => (
          <div>
            <img
              key={index}
              src={avatar.imageUrl}
              alt={`${avatar.first_name}`}
              onClick={() => onAvatarClick(avatar.id)}
              className="avatar"
            />
            <p className="name_photo">{avatar.first_name}</p>
          </div>
        ))}
        {/* Ajoutez des boutons pour faire défiler si vous avez plus de trois avatars */}
      </div>
      <button className="run-button" onClick={runAdventure}>
        Run
      </button>
    </div>
  );
};

export default CardComponent;
