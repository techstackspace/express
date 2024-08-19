import { Request, Response } from 'express';
import Bookmark from '../../models/bookmark';
import { error } from '../../config/debugger';

const addBookmark = async (req: Request, res: Response) => {
  const { product } = req.body;
  const userId = req.body.user;

  if (!product) {
    return res.status(400).json({ message: 'Product is required.' });
  }

  try {
    const existingBookmark = await Bookmark.findOne({ user: userId, product });
    if (existingBookmark) {
      return res.status(200).json({ message: 'Product already bookmarked.' });
    }

    const bookmark = new Bookmark({ user: userId, product });
    const savedBookmark = await bookmark.save();
    return res.status(201).json(savedBookmark);
  } catch (err) {
    if (err instanceof Error) {
      error('Error adding bookmark:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred while adding bookmark.' });
    }
  }
};

const removeBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user;

  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: id, user: userId });
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found.' });
    }
    return res.status(200).json({ message: 'Bookmark removed successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      error('Error removing bookmark:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred while removing bookmark.' });
    }
  }
};

const getBookmarks = async (req: Request, res: Response) => {
  const userId = req.body.user;
  try {
    const bookmarks = await Bookmark.find({ user: userId }).populate('product');
    return res.status(200).json(bookmarks);
  } catch (err) {
    if (err instanceof Error) {
      error('Error getting bookmarks:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred while getting bookmarks.' });
    }
  }
};

export { addBookmark, removeBookmark, getBookmarks };
