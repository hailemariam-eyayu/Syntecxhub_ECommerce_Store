import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public: get all products
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Public: get single product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Admin: create product
router.post('/', protect, admin, async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
    countInStock,
  });
  res.status(201).json(product);
});

// Admin: update product
router.put('/:id', protect, admin, async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.image = image ?? product.image;
  product.category = category ?? product.category;
  product.countInStock = countInStock ?? product.countInStock;

  const updated = await product.save();
  res.json(updated);
});

// Admin: delete product
router.delete('/:id', protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

export default router;

