import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import avatarImage from '../img/icon.png'; // Remplacez par le chemin de votre image

const CreateAvatar = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    age: localStorage.getItem('age') || '',
    relationshipType: localStorage.getItem('relationshipType') || '',
    gender: localStorage.getItem('gender') || '',
    personality: localStorage.getItem('personality') || '',
    traits: localStorage.getItem('traits') || '',
    writing: localStorage.getItem('writing') || 'chatty',
    physical: {
      height: localStorage.getItem('height') || '',
      weight: localStorage.getItem('weight') || '',
      eyeColor: localStorage.getItem('eyeColor') || '',
      hairColor: localStorage.getItem('hairColor') || '',
      bustSize: localStorage.getItem('bustSize') || '',
    },
  });
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object') {
        Object.keys(formData[key]).forEach(subKey => {
          localStorage.setItem(subKey, formData[key][subKey]);
        });
      } else {
        localStorage.setItem(key, formData[key]);
      }
    });
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhysicalChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      physical: {
        ...formData.physical,
        [name]: value,
      },
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form data before submission:', formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/avatars/`,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          age: parseInt(formData.age, 10),
          gender: formData.gender,
          personality: formData.personality,
          traits: formData.traits,
          writing: formData.writing,
          eye_color: formData.physical.eyeColor,
          hair_color: formData.physical.hairColor,
          weight: parseInt(formData.physical.weight, 10),
          bust_size: formData.physical.bustSize,
          profile_image: generatedImage, // Use the generated image as profile_image
          user_id: 1, // Replace with actual user ID if available
        }
      );
      console.log('Avatar creation response:', response);
      if (response.status === 200) {
        alert('Avatar created successfully!');
        navigate('/dashboard');
        // Perform any additional actions after successful avatar creation
      }
    } catch (error) {
      console.error('There was an error creating the avatar!', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/generate-image/',
        {
          physical: formData.physical,
          gender: formData.gender,
        }
      );
      console.log('Generated image response:', response);
      setGeneratedImage(response.data.image); // Assurez-vous que le champ de l'URL de l'image est correct
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const renderStep1 = () => (
    <div style={{ flex: 1, padding: '20px' }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          setStep(2);
        }}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            First Name
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Last Name
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Age
          </label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Relationship Type
          </label>
          <div className="control">
            <div className="select" style={{ borderColor: '#7F5056' }}>
              <select
                name="relationshipType"
                value={formData.relationshipType}
                onChange={handleChange}
                required
              >
                <option value="" hidden>
                  Choose here
                </option>
                <option value="Friendship">Friendship</option>
                <option value="Mentor">Mentor</option>
                <option value="Romantic">Romantic</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Gender
          </label>
          <div className="control">
            <div className="select" style={{ borderColor: '#7F5056' }}>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" hidden>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-primary"
              style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
              <span>Continue</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ flex: 1, padding: '20px' }}>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Height (cm)
          </label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="height"
              value={formData.physical.height}
              onChange={handlePhysicalChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Weight (kg)
          </label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="weight"
              value={formData.physical.weight}
              onChange={handlePhysicalChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Eye Color
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="eyeColor"
              value={formData.physical.eyeColor}
              onChange={handlePhysicalChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" style={{ color: '#D76C58' }}>
            Hair Color
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="hairColor"
              value={formData.physical.hairColor}
              onChange={handlePhysicalChange}
              required
              style={{ borderColor: '#7F5056' }}
            />
          </div>
        </div>
        {formData.gender === 'Female' && (
          <div className="field">
            <label className="label" style={{ color: '#D76C58' }}>
              Bust Size
            </label>
            <div className="control">
              <div className="select" style={{ borderColor: '#7F5056' }}>
                <select
                  name="bustSize"
                  value={formData.physical.bustSize}
                  onChange={handlePhysicalChange}
                  required
                >
                  <option value="" hidden>
                    Choose bust size
                  </option>
                  {[
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z',
                  ].map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                  {[70, 75, 80, 85, 90, 95, 100, 105, 110].map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="field">
          <div className="control">
            <button
              className="button"
              onClick={() => setStep(1)}
              style={{
                marginRight: '10px',
                backgroundColor: '#7F5056',
                borderColor: '#7F5056',
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
              <span>Back</span>
            </button>
            <button
              className="button is-primary"
              type="submit"
              style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
              <span>Create Avatar</span>
            </button>
            <button
              className="button"
              type="button"
              onClick={handleGenerateImage}
              style={{
                marginLeft: '10px',
                backgroundColor: '#7F5056',
                borderColor: '#7F5056',
              }}
            >
              Generate Image
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div
      className="container is-fluid"
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#222D41',
        color: '#D76C58',
      }}
    >
      <div style={{ flex: 1, padding: '20px' }}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {generatedImage ? (
          <img
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated"
            style={{ width: '300px', height: '300px', borderRadius: '50%' }}
          />
        ) : (
          <img
            src={avatarImage}
            alt="Avatar"
            style={{ width: '300px', height: '300px', borderRadius: '50%' }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateAvatar;
