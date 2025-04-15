import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem('storeToken');  // Get the token from localStorage
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Pass token in the Authorization header
          },
        });
        setStores(response.data);
      } catch (error) {
        setError('Failed to fetch stores');
        console.error('Failed to fetch stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Stores</h2>
      {stores.map((store) => (
        <div key={store.id} className="border rounded-lg p-3 mb-2">
          <h3 className="text-lg font-bold">{store.name}</h3>
          <p><strong>Location:</strong> {store.location}</p>
          <p><strong>Description:</strong> {store.description}</p>
          <Link to={`/dashboard/store/${store.id}`} className="text-blue-600 underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
