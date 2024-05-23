// src/LoginComponents/Step4.js
import React from 'react';

const Step4 = ({
  physical,
  setPhysical,
  handleSubmit,
  setStep,
  handleGenerateImage,
  generatedImage,
}) => {
  return (
    <div
      className="box"
      style={{
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F5F5F5',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Height</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Height in cm"
              value={physical.height}
              onChange={e =>
                setPhysical({ ...physical, height: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Weight</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Weight in kg"
              value={physical.weight}
              onChange={e =>
                setPhysical({ ...physical, weight: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Eye Color</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Eye Color"
              value={physical.eyeColor}
              onChange={e =>
                setPhysical({ ...physical, eyeColor: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Hair Color</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Hair Color"
              value={physical.hairColor}
              onChange={e =>
                setPhysical({ ...physical, hairColor: e.target.value })
              }
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
            >
              Create Account
            </button>
            <button className="button" onClick={() => setStep(3)}>
              Back
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
      {generatedImage && (
        <div
          className="box"
          style={{
            marginTop: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#F5F5F5',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${generatedImage}`}
            alt="Generated"
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default Step4;
