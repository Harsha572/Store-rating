import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch(`/api/stores/${id}`)
      .then(res => res.json())
      .then(data => setStore(data))
      .catch(err => console.error('Error loading store details:', err));
  }, [id]);

  if (!store) return <p>Loading...</p>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>Average Rating: {store.avg_rating}</p>
      {/* Optionally add a form for users to rate the store here */}
    </div>
  );
};

export default StoreDetails;
