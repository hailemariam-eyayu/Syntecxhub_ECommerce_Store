import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

export async function admin(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) {
      return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

