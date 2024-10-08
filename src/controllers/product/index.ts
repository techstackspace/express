import { Request, Response } from 'express';
import Product from '../../models/product';
import { Types, SortOrder } from 'mongoose';
import { sendMail } from '../../config/nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../models/user';
import { extractPdfContent } from '../../utils/pdf';

function isJwtPayload(
  user: string | JwtPayload | undefined
): user is JwtPayload {
  return (user as JwtPayload)?.id !== undefined;
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      minPrice,
      maxPrice,
      category,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (category) {
      query.category = category;
    }

    const sort = {
      [typeof sortBy === 'string' ? sortBy : 'createdAt']:
        order === 'asc' ? 1 : -1,
    };

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort,
    };

    const products = await Product.paginate(query, options);
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

const getProductsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const {
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    category,
    sortBy = 'createdAt',
    order = 'desc',
  } = req.query;

  try {
    const query: any = { user: userId };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (category) {
      query.category = category;
    }

    const sort: { [key: string]: SortOrder } = {
      [typeof sortBy === 'string' ? sortBy : 'createdAt']:
        order === 'asc' ? 'asc' : 'desc',
    };

    const products = await Product.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found for this user' });
    }

    return res.status(200).json(products);
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
    const pdfs: string[] = [];
    const pdfContents: string[] = [];
    const user = req.body.user;

    if (files && Array.isArray(files)) {
      for (const file of files) {
        if (file.mimetype.startsWith('image/')) {
          if (images.length < 5) {
            images.push(file.path);
          }
        } else if (file.mimetype.startsWith('video/')) {
          if (videos.length < 3) {
            videos.push(file.path);
          }
        } else if (file.mimetype === 'application/pdf') {
          const content = await extractPdfContent(file.path);
          pdfs.push(file.path);
          pdfContents.push(content);
        }
      }
    }

    if (images.length > 5) images.length = 5;
    if (videos.length > 3) videos.length = 3;

    const payload = {
      ...body,
      images,
      videos,
      pdfs,
      pdfContents,
      user,
    };

    const product = new Product(payload);
    const savedProduct = await product.save();

    if (req.user && isJwtPayload(req.user)) {
      const userInfo = await User.findById(req.user.id);
      if (userInfo) {
        const userEmail = userInfo.email;
        const subject = 'Product Created Successfully';
        const text = `Dear ${userInfo.name},\n\nYour product "${savedProduct.name}" has been successfully created.\n\nBest regards,\nTechStackSpace Shop`;
        await sendMail(userEmail, subject, text);
      }
    }

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
  const userId = req.body.user;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== userId) {
      return res.status(403).json({
        message: 'Forbidden: You are not authorized to update this product',
      });
    }

    const { files, body } = req;
    const images: string[] = [];
    const videos: string[] = [];

    if (files && Array.isArray(files)) {
      files.forEach((file) => {
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

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );

    if (isJwtPayload(req.user)) {
      const userInfo = await User.findById(req.user?.id);
      if (userInfo) {
        const userEmail = userInfo.email;
        const subject = 'Product Updated Successfully';
        const text = `Dear ${userInfo?.name},\n\nYour product "${updatedProduct?.name}" has been successfully created.\n\nBest regards,\nTechStackSpace Shop`;

        await sendMail(userEmail, subject, text);
      }
    }

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
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
  const userId = req.body.user;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== userId) {
      return res.status(403).json({
        message: 'Forbidden: You are not authorized to delete this product',
      });
    }

    await Product.findByIdAndDelete(id);

    if (isJwtPayload(req.user)) {
      const userInfo = await User.findById(req.user?.id);
      if (userInfo) {
        const userEmail = userInfo.email;
        const subject = 'Product Deleted Successfully';
        const text = `Dear ${userInfo.name},\n\nYour product "${product.name}" has been successfully deleted.\n\nBest regards,\nTechStackSpace Shop`;

        await sendMail(userEmail, subject, text);
      }
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
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
  getProductsByUser,
  updateProduct,
  deleteProduct,
  toggleLikeProduct,
};
