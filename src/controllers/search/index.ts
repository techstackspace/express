import { Request, Response } from 'express';
import Bookmark from '../../models/bookmark';
import Cart from '../../models/cart';
import Comment from '../../models/comment';
import Order from '../../models/order';
import Product from '../../models/product';
import Review from '../../models/review';
import User from '../../models/user';
import { createSearchQuery } from '../../utils/search';
import { modelSearchFields } from '../../utils/search/fields';

const globalSearch = async (req: Request, res: Response) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  const searchQuery = createSearchQuery(search as string, modelSearchFields);

  try {
    const [bookmarks, carts, products, users, reviews, comments, orders] =
      await Promise.all([
        Bookmark.find(searchQuery),
        Cart.find(searchQuery),
        Product.find(searchQuery),
        User.find(searchQuery),
        Review.find(searchQuery),
        Comment.find(searchQuery),
        Order.find(searchQuery),
      ]);

    res.status(200).json({
      bookmarks,
      carts,
      products,
      users,
      reviews,
      comments,
      orders,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred during the global search' });
    }
  }
};

export default globalSearch;
