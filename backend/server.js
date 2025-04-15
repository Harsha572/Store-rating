const authenticateToken = require('./middleware/authMiddleware');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./models/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const storeRoutes = require('./routes/store');
app.use('/api/stores', storeRoutes);

const ratingsRoutes = require('./routes/ratings');
app.use('/api/ratings', authenticateToken, ratingsRoutes); // Ratings route with authentication

// Protected test route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'You are authorized!',
    user: req.user  // contains id and role from the JWT
  });
});

// Test route to check DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, serverTime: result.rows[0].now });
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});
