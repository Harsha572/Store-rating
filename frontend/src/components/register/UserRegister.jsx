import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    // Ensure all fields are filled
    if (!name || !email || !password || !address) {
      return setErrorMsg('All fields are required');
    }

    try {
      // Make the registration request
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        address,
        role: 'user', // Default role for user registration
      });
      console.log('Registration successful:', res.data);
      // Optionally, redirect to login page after successful registration
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Add input for Address */}
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      
      <button onClick={handleRegister}>Register</button>
      
      <p>
        Already have an account? <a href="/login/user">Login here</a>
      </p>
    </div>
  );
};

export default UserRegister;
