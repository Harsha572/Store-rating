import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores from backend
    fetch('/api/stores')
      .then(res => res.json())
      .then(data => setStores(data))
      .catch(err => console.error('Failed to load stores:', err));
  }, []);

  return (
    <div>
      <h2>Available Stores</h2>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <Link to={`/stores/${store.id}`}>{store.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
