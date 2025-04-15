const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');  // Import the auth middleware
const {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore
} = require('../models/store');

// Protect the route with the authMiddleware
router.get('/', authMiddleware, async (req, res) => {
  try {
    const stores = await getAllStores();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const store = await getStoreById(req.params.id);
    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch store' });
  }
});

// Create, update, delete store routes (protected with middleware as needed)
router.post('/', authMiddleware, async (req, res) => {
  const { name, location, description, ownerId } = req.body;
  if (!name || !location || !description || !ownerId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newStore = await createStore(name, location, description, ownerId);
    res.status(201).json(newStore);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create store' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, location, description } = req.body;

  try {
    const updatedStore = await updateStore(req.params.id, name, location, description);
    res.json(updatedStore);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update store' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await deleteStore(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete store' });
  }
});

module.exports = router;
