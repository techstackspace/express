import express from 'express';
import Product from '../models';
import { error } from '../config/debugger';

const getAllProducts = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const createProduct = async (req: express.Request, res: express.Response) => {
  const payload = req.body;

  if (!payload) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const product = new Product(payload);
    const savedProduct = await product.save();
    return res
      .status(201)
      .json({ message: 'Product created successfully', product: savedProduct });
  } catch (err: unknown) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export { getAllProducts, createProduct };
