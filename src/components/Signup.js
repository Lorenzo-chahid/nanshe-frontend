import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bulma-components';
import axios from 'axios';
import logo from '../img/icon.png'; // Assurez-vous que le chemin vers votre logo est correct
import Step1 from './SignupComponents/Step1';
import Step2 from './SignupComponents/Step2';
import Step3 from './SignupComponents/Step3';
import Step4 from './SignupComponents/Step4';
import './css/Signup.css'; // Assurez-vous de créer ce fichier CSS

const Signup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState(
    localStorage.getItem('password') || ''
  );
  const [confirmPassword, setConfirmPassword] = useState(
    localStorage.getItem('confirmPassword') || ''
  );
  const [profileImage, setProfileImage] = useState('');
  const [gender, setGender] = useState(localStorage.getItem('gender') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [physical, setPhysical] = useState({
    height: localStorage.getItem('height') || '',
    weight: localStorage.getItem('weight') || '',
    eyeColor: localStorage.getItem('eyeColor') || '',
    hairColor: localStorage.getItem('hairColor') || '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('confirmPassword', confirmPassword);
    localStorage.setItem('gender', gender);
    localStorage.setItem('role', role);
    localStorage.setItem('height', physical.height);
    localStorage.setItem('weight', physical.weight);
    localStorage.setItem('eyeColor', physical.eyeColor);
    localStorage.setItem('hairColor', physical.hairColor);
  }, [username, email, password, confirmPassword, gender, role, physical]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/`,
        {
          username,
          email,
          password,
          profile_image: profileImage, // Ensure profile_image is included
        }
      );
      if (response.status === 200) {
        setShowModal(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('There was an error creating the account!', error);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-image/`,
        {
          physical,
          gender,
        }
      );
      setGeneratedImage(response.data.image); // Assurez-vous que le champ de l'URL de l'image est correct
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="account-creation-container">
      <div className="form-container">
        <img src={logo} alt="Nanshe Logo" className="logo" />
        <h1 className="title">Welcome to Nanshe</h1>
        <p className="subtitle">
          Create roleplay discussions with an AI that acts in the role you
          desire.
        </p>
        {step === 1 && (
          <Step1
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Step2 gender={gender} setGender={setGender} setStep={setStep} />
        )}
        {step === 3 && (
          <Step3 role={role} setRole={setRole} setStep={setStep} />
        )}
        {step === 4 && (
          <Step4
            physical={physical}
            setPhysical={setPhysical}
            handleSubmit={handleSubmit}
            setStep={setStep}
            handleGenerateImage={handleGenerateImage}
            generatedImage={generatedImage}
          />
        )}
        {showModal && (
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content>
              <div className="notification is-primary">
                Congratulations! Your account has been created successfully.
              </div>
            </Modal.Content>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Signup;
