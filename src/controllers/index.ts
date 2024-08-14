import { Request, Response } from 'express';
import Product from '../models';
import { error } from '../config/debugger';

const getAllProducts = async (_req: Request, res: Response) => {
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

const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err: unknown) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const createProduct = async (req: Request, res: Response) => {
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

const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res
      .status(200)
      .json({ message: 'Product updated successfully', product });
  } catch (err: unknown) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    return res
      .status(200)
      .json({ message: 'Product deleted successfully', product });
  } catch (err: unknown) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
