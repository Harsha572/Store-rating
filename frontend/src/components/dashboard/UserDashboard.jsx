import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stores');
        setStores(res.data);
      } catch (err) {
        setError('Failed to fetch stores');
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <p>{error}</p>}
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>{store.description}</p>
            <p>{store.location}</p>
            {/* Rating functionality will go here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
