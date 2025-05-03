const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select('-password');
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
