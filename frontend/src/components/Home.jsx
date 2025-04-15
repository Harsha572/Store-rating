import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/auth.css";

const Home = () => {
  return (
    <div className="home">
      <h2>Login as:</h2>
      <div className="role-links">
        <Link to="/login/user">User</Link><br />
        <Link to="/login/admin">Admin</Link><br />
        <Link to="/login/store">Store Owner</Link>
      </div>
    </div>
  );
};

export default Home;