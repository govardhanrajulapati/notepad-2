// File: SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password });
      if(response.status === 201) {
        alert('Signup successful! Please log in.');
        navigate('/');
      }
      else{
         setSignupError('Signup failed! Please try again.');
      }
    } catch (error) {
      setSignupError('Signup failed! ' + error.message);
    }
  };

  return (
    <div className="signup-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
      {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
    </form>
    </div>
  );
}

export default SignupForm;