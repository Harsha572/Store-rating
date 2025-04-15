const express = require('express');
const router = express.Router();
const {
  addOrUpdateRating,
  getStoreRatings,
  getAverageRating
} = require('../models/ratings');

// Add or update rating and comment
router.post('/:storeId', async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id; // Assuming JWT contains user id

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const updatedRating = await addOrUpdateRating(req.params.storeId, userId, rating, comment);
    res.status(201).json(updatedRating);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add/update rating' });
  }
});

// Get all ratings for a store
router.get('/:storeId', async (req, res) => {
  try {
    const ratings = await getStoreRatings(req.params.storeId);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});

// Get average rating for a store
router.get('/average/:storeId', async (req, res) => {
  try {
    const avgRating = await getAverageRating(req.params.storeId);
    res.json({ avg_rating: avgRating });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch average rating' });
  }
});

module.exports = router;
