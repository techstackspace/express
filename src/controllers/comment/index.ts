import { Request, Response } from 'express';
import Comment from '../../models/comment';
import Product from '../../models/product';
import { Types } from 'mongoose';
import { SortOrder } from 'mongoose';

const getAllComments = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      minDate,
      maxDate,
      user,
      product,
      minLikes,
      maxLikes,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const sortOrder: SortOrder = order === 'asc' ? 1 : -1;

    const query: any = {};

    if (user) {
      query.user = user;
    }

    if (product) {
      query.product = product;
    }

    if (search) {
      query.content = { $regex: new RegExp(search as string, 'i') };
    }

    if (minDate || maxDate) {
      query.createdAt = {};
      if (minDate) query.createdAt.$gte = new Date(minDate as string);
      if (maxDate) query.createdAt.$lte = new Date(maxDate as string);
    }

    if (minLikes || maxLikes) {
      query.likes = {};
      if (minLikes) query.likes.$gte = Number(minLikes);
      if (maxLikes) query.likes.$lte = Number(maxLikes);
    }

    const sortOptions: { [key: string]: SortOrder } = { [sort as string]: sortOrder };

    const comments = await Comment.find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalComments = await Comment.countDocuments(query);

    res.status(200).json({
      comments,
      totalPages: Math.ceil(totalComments / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(comment);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const createComment = async (req: Request, res: Response) => {
  const { user, product, content } = req.body;
  if (!user || !product || !content) {
    return res.status(400).json({ message: 'Missing required field' });
  }

  try {
    const comment = new Comment({ user, product, content });
    const savedComment = await comment.save();

    await Product.findByIdAndUpdate(product, {
      $push: { comments: savedComment._id },
    });

    return res.status(201).json({ comment: savedComment });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const updateComment = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;
  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ message: 'Missing required field' });
  }
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res
      .status(200)
      .json({ message: 'Comment updated successfully', comment });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Product.findByIdAndUpdate(comment.product, {
      $pull: { comments: comment._id },
    });

    return res
      .status(200)
      .json({ message: 'Comment deleted successfully', comment });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const toggleLikeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { user: userId } = req.body;

  if (!Types.ObjectId.isValid(commentId) || !Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const userHasLiked = comment.likes.includes(userId);
    if (userHasLiked) {
      const index = comment.likes.findIndex((id) => id === userId);
      comment.likes.splice(index, 1);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    return res
      .status(200)
      .json({ message: 'Like toggled successfully', comment });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  toggleLikeComment,
};
