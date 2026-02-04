import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// User: create order (checkout)
router.post('/', protect, async (req, res) => {
  const { items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ message: 'No order items' });
  }

  const orderItems = [];
  let totalPrice = 0;

  // Simple stock and price check
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.countInStock < item.qty) {
      return res.status(400).json({ message: `Not enough stock for ${product.name}` });
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      qty: item.qty,
      price: product.price,
      image: product.image,
    });

    totalPrice += product.price * item.qty;
    product.countInStock -= item.qty;
    await product.save();
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems,
    totalPrice,
  });

  res.status(201).json(order);
});

// User: get own orders
router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// Admin: get all orders
router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

export default router;

