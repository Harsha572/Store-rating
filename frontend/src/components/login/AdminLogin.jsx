import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/auth.css";


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password, role: "admin" });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/dashboard/admin');
    } catch (err) {
      setErrorMsg('Unregistered email or invalid credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span className="link" onClick={() => navigate('/register/admin')}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default AdminLogin;
