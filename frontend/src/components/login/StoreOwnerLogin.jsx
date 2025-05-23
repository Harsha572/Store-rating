import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/auth.css";

const StoreOwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password, role: "owner" });
      localStorage.setItem('storeToken', res.data.token);
      navigate('/dashboard/store');
    } catch (err) {
      setErrorMsg('Unregistered email or invalid credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Store Owner Login</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span className="link" onClick={() => navigate('/register/store')}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default StoreOwnerLogin;
