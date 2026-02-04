import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Syntecxhub E-Commerce API is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

async function start() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/syntecxhub_ecommerce';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();


