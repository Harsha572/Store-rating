const pool = require('./db');

// Add or update rating and comment for a store
const addOrUpdateRating = async (storeId, userId, rating, comment) => {
  const existingRating = await pool.query(
    'SELECT * FROM ratings WHERE store_id = $1 AND user_id = $2',
    [storeId, userId]
  );

  if (existingRating.rows.length > 0) {
    // Update existing rating and comment
    const result = await pool.query(
      'UPDATE ratings SET rating = $1, comment = $2 WHERE store_id = $3 AND user_id = $4 RETURNING *',
      [rating, comment, storeId, userId]
    );
    return result.rows[0];
  } else {
    // Insert new rating and comment
    const result = await pool.query(
      'INSERT INTO ratings (store_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [storeId, userId, rating, comment]
    );
    return result.rows[0];
  }
};

// Get all ratings for a store
const getStoreRatings = async (storeId) => {
  const result = await pool.query('SELECT * FROM ratings WHERE store_id = $1', [storeId]);
  return result.rows;
};

// Get average rating for a store
const getAverageRating = async (storeId) => {
  const result = await pool.query(
    'SELECT AVG(rating) AS avg_rating FROM ratings WHERE store_id = $1',
    [storeId]
  );
  return result.rows[0].avg_rating;
};

module.exports = {
  addOrUpdateRating,
  getStoreRatings,
  getAverageRating
};
