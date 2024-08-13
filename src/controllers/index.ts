import express from 'express';
import Product from '../models';
import { error } from '../config/debugger';

const getAllProducts = async (_req: express.Request, res: express.Response) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (err) {
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
    return res.status(400).json({ message: 'Enter required field' });
  }
  try {
    const product = new Product(payload);
    const savedProduct = await product.save();
    return res
      .status(201)
      .json({ message: 'Product created successfully', product: savedProduct });
  } catch (err) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export { getAllProducts, createProduct };
