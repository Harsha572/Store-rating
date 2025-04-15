import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StoreDetails = () => {
  const { id } = useParams(); // assuming route is /stores/:id
  const [store, setStore] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState({ rating: '', comment: '' });
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  const fetchStore = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stores/${id}`);
      setStore(response.data);
    } catch (error) {
      console.error('Failed to fetch store:', error);
      setError('Failed to fetch store details');
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ratings/average/${id}`);
      setAverageRating(response.data.avg_rating);
    } catch (error) {
      console.error('Failed to fetch average rating:', error);
      setError('Failed to fetch average rating');
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ratings/${id}`);
      setRatings(response.data);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
      setError('Failed to fetch ratings');
    }
  };

  useEffect(() => {
    fetchStore();
    fetchAverageRating();
    fetchRatings();
  }, [id]);

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setUserRating((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    const { rating, comment } = userRating;

    if (!rating || rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/ratings/${id}`, { rating, comment });
      setUserRating({ rating: '', comment: '' }); // Reset the form
      // Re-fetch ratings and average rating after submitting the new rating
      fetchAverageRating();
      fetchRatings();
    } catch (error) {
      setError('Failed to submit rating');
    }
  };

  if (!store) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{store.name}</h2>
      <p><strong>Location:</strong> {store.location}</p>
      <p><strong>Description:</strong> {store.description}</p>

      <div className="mt-4">
        <h3 className="text-xl">Average Rating: {averageRating ? averageRating.toFixed(1) : 'N/A'}</h3>

        <div className="mt-4">
          <h4 className="text-lg">Submit Your Rating</h4>
          <form onSubmit={handleSubmitRating}>
            <div>
              <label htmlFor="rating" className="mr-2">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={userRating.rating}
                onChange={handleRatingChange}
                min="1"
                max="5"
                className="border rounded p-2"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="comment" className="mr-2">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                value={userRating.comment}
                onChange={handleRatingChange}
                rows="3"
                className="border rounded p-2"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button type="submit" className="mt-2 bg-blue-600 text-white p-2 rounded">
              Submit Rating
            </button>
          </form>
        </div>

        <div className="mt-4">
          <h4 className="text-lg">User Ratings:</h4>
          {ratings.length > 0 ? (
            <ul>
              {ratings.map((rating) => (
                <li key={rating.id} className="border p-2 mb-2">
                  <p><strong>Rating:</strong> {rating.rating}</p>
                  <p><strong>Comment:</strong> {rating.comment}</p>
                  <p><strong>By:</strong> User {rating.user_id}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ratings yet for this store.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
