import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

function generateToken(user) {
  const payload = { id: user._id, isAdmin: user.isAdmin };
  const secret = process.env.JWT_SECRET || 'dev_secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;

