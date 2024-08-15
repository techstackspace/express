import { Request, Response } from 'express';
import { error } from '../../config/debugger';
import Comment from '../../models/comment';
import Product from '../../models/product';

const getAllComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (err) {
    if (err instanceof Error) {
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(comment);
  } catch (err) {
    if (err instanceof Error) {
      error('Server error!', err.message);
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
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const updateComment = async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
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
      error('Server error!', err.message);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
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
      error('Server error!', err.message);
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
};
