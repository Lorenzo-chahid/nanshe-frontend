// src/LoginComponents/Step2.js
import React from 'react';

const Step2 = ({ gender, setGender, setStep }) => {
  return (
    <div
      className="box"
      style={{
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F5F5F5',
      }}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          setStep(3);
        }}
      >
        <div className="field">
          <label className="label">Gender</label>
          <div className="control">
            {['female', 'male', 'non-binary', 'andro'].map(g => (
              <label key={g} className="radio">
                <input
                  type="radio"
                  value={g}
                  checked={gender === g}
                  onChange={e => setGender(e.target.value)}
                />{' '}
                {g}
              </label>
            ))}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              style={{ backgroundColor: '#7F5056', borderColor: '#7F5056' }}
            >
              Next
            </button>
            <button className="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="button" onClick={() => setStep(3)}>
              Skip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
