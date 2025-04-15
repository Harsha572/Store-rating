import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#222', color: '#fff', padding: '1rem' }}>
      <h1>Store Rating Platform</h1>
      <nav style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
        <Link to="/login/user" style={{ color: '#fff', marginRight: '1rem' }}>User Login</Link>
        <Link to="/login/admin" style={{ color: '#fff', marginRight: '1rem' }}>Admin Login</Link>
        <Link to="/login/storeowner" style={{ color: '#fff' }}>Store Owner Login</Link>
      </nav>
    </header>
  );
};

export default Header;
