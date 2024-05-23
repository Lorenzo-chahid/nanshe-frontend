import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateAvatarButton = ({ onCreate }) => {
  return (
    <button
      className="button is-primary"
      onClick={onCreate}
      style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faPlus} />
      </span>
      <span>Create Avatar</span>
    </button>
  );
};

export default CreateAvatarButton;
