import { Request, Response } from 'express';
import Bookmark from '../../models/bookmark';
import { SortOrder } from 'mongoose';

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
      return res
        .status(500)
        .json({ error: 'An error occurred while removing bookmark.' });
    }
  }
};

const getBookmarks = async (req: Request, res: Response) => {
  const userId = req.body.user;
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc',
    search,
    minDate,
    maxDate,
    productCategory,
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const sortOrder: SortOrder = order === 'asc' ? 1 : -1;

  const query: any = { user: userId };

  if (productCategory) {
    query['product.category'] = productCategory;
  }

  if (search) {
    query.$or = [
      { 'product.name': { $regex: new RegExp(search as string, 'i') } },
    ];
  }

  if (minDate || maxDate) {
    query.createdAt = {};
    if (minDate) query.createdAt.$gte = new Date(minDate as string);
    if (maxDate) query.createdAt.$lte = new Date(maxDate as string);
  }

  try {
    const sortOptions: { [key: string]: SortOrder } = {
      [sort as string]: sortOrder,
    };

    const bookmarks = await Bookmark.find(query)
      .populate('product')
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalBookmarks = await Bookmark.countDocuments(query);

    res.status(200).json({
      bookmarks,
      totalPages: Math.ceil(totalBookmarks / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while getting bookmarks.' });
    }
  }
};

export { addBookmark, removeBookmark, getBookmarks };
