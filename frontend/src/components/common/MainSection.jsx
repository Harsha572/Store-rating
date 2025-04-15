import React from 'react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Welcome to the Store Rating Platform</h2>
      <p>Select your role to proceed:</p>

      <div style={{ marginTop: '2rem' }}>
        <p>
          <Link to="/login/user">Login as User</Link>
        </p>
        <p>
          <Link to="/login/admin">Login as Admin</Link>
        </p>
        <p>
          <Link to="/login/store">Login as Store Owner</Link>
        </p>
      </div>
    </div>
  );
};

export default MainSection;
