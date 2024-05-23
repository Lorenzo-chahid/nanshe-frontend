// src/LoginComponents/Step3.js
import React from 'react';

const Step3 = ({ role, setRole, setStep }) => {
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
          setStep(4);
        }}
      >
        <div className="field">
          <label className="label">Role</label>
          <div className="control">
            <label className="card">
              <input
                type="radio"
                value="user"
                checked={role === 'user'}
                onChange={e => setRole(e.target.value)}
              />{' '}
              User
            </label>
            <label className="card" style={{ opacity: 0.5 }}>
              <input type="radio" disabled value="role1" /> Role 1 (soon)
            </label>
            <label className="card" style={{ opacity: 0.5 }}>
              <input type="radio" disabled value="role2" /> Role 2 (soon)
            </label>
            <label className="card" style={{ opacity: 0.5 }}>
              <input type="radio" disabled value="role3" /> Role 3 (soon)
            </label>
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
            <button className="button" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="button" onClick={() => setStep(4)}>
              Skip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3;
