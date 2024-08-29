import { Request, Response } from 'express';
import Product from '../../models/product';
import { Types } from 'mongoose';

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id).populate('comments');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { files, body } = req;
    const images: string[] = [];
    const videos: string[] = [];

    if (files && Array.isArray(files)) {
      files.forEach((file: any) => {
        if (file.mimetype.startsWith('image/')) {
          if (images.length < 5) {
            images.push(file.path);
          }
        } else if (file.mimetype.startsWith('video/')) {
          if (videos.length < 3) {
            videos.push(file.path);
          }
        }
      });
    }

    if (images.length > 5) images.length = 5;
    if (videos.length > 3) videos.length = 3;

    const payload = {
      ...body,
      images,
      videos,
    };

    const product = new Product(payload);
    const savedProduct = await product.save();

    return res
      .status(201)
      .json({ message: 'Product created successfully', product: savedProduct });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const { files, body } = req;
    const images: string[] = [];
    const videos: string[] = [];

    if (files && Array.isArray(files)) {
      files.forEach((file: any) => {
        if (file.mimetype.startsWith('image/')) {
          if (images.length < 5) {
            images.push(file.path);
          }
        } else if (file.mimetype.startsWith('video/')) {
          if (videos.length < 3) {
            videos.push(file.path);
          }
        }
      });
    }

    if (images.length > 5) images.length = 5;
    if (videos.length > 3) videos.length = 3;

    const payload = {
      ...body,
      images: images.length > 0 ? images : body.images,
      videos: videos.length > 0 ? videos : body.videos,
    };

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
  } catch (err) {
    if (err instanceof Error) {
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
      return res.status(404).json({ message: 'Product not found' });
    }
    return res
      .status(200)
      .json({ message: 'Product deleted successfully', product });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const toggleLikeProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.body.user;
  if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format or Missing required field' });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const userHasLiked = product.likes.includes(userId);
    if (userHasLiked) {
      const index = product.likes.findIndex((id) => id === userId);
      product.likes.splice(index, 1);
    } else {
      product.likes.push(userId);
    }
    const savedProduct = await product.save();
    return res
      .status(201)
      .json({ message: 'Like toggled successfully', product: savedProduct });
  } catch (err) {
    if (err instanceof Error) {
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
  toggleLikeProduct,
};
