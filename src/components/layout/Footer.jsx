import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', background: '#f5f5f5' }}>
      <p>&copy; {new Date().getFullYear()} Store Rating Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
