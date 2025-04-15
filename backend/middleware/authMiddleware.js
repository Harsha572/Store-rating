const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authMiddleware = (req, res, next) => {
  // Retrieve token from authorization header (Bearer token)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If token is not provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded.user;  // You can access the user data via req.user in your route handlers
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    // Token verification failed
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
