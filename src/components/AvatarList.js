import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bulma-components';

const AvatarList = ({ avatars, onFavorite, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 200,
  });

  const handleEdit = avatarId => {
    navigate(`/avatar/${avatarId}`);
  };

  const handleDeleteClick = avatarId => {
    setSelectedAvatar(avatarId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(selectedAvatar);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAvatar(null);
  };

  const handleAvatarClick = avatarId => {
    navigate(`/chat/${avatarId}`);
  };
  console.log('HERE :: ', avatars);

  return (
    <animated.div style={{ ...animationProps, flex: 1, overflow: 'hidden' }}>
      <h2 className="title is-4" style={{ color: '#D76C58' }}>
        My Avatars
      </h2>
      <div style={{ height: '400px', overflowY: 'auto' }}>
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {avatars.map(avatar => (
              <tr
                key={avatar.id}
                onClick={() => handleAvatarClick(avatar.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <figure className="image is-48x48">
                    <img
                      className="is-rounded"
                      src={avatar.profile_image}
                      alt="Avatar"
                    />
                  </figure>
                </td>
                <td>
                  {avatar.first_name} {avatar.last_name}
                </td>
                <td>
                  <button
                    className="button is-small is-light"
                    onClick={e => {
                      e.stopPropagation();
                      onFavorite(avatar.id);
                    }}
                    style={{ marginRight: '5px' }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    className="button is-small is-light"
                    onClick={e => {
                      e.stopPropagation();
                      handleEdit(avatar.id);
                    }}
                    style={{ marginRight: '5px' }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="button is-small is-light"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteClick(avatar.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Content>
          <div
            className="box"
            style={{ backgroundColor: '#222D41', color: '#D76C58' }}
          >
            <h3 className="title is-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this avatar?</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <Button
                className="is-light"
                onClick={closeModal}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </Button>
              <Button className="is-danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </animated.div>
  );
};

export default AvatarList;
