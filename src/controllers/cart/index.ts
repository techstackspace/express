import { Request, Response } from 'express';
import Cart from '../../models/cart';
import { SortOrder } from 'mongoose';
import {
  addToCartSchema,
  deleteFromCartSchema,
  getCartItemsSchema,
} from '../../validation/cart';

const getCartItems = async (req: Request, res: Response) => {
  const { error, value } = getCartItemsSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const userId = req.body.user;
  const {
    page,
    limit,
    sort,
    order,
    search,
    minQuantity,
    maxQuantity,
    productCategory,
  } = value;

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

  if (minQuantity || maxQuantity) {
    query.quantity = {};
    if (minQuantity) query.quantity.$gte = Number(minQuantity);
    if (maxQuantity) query.quantity.$lte = Number(maxQuantity);
  }

  try {
    const sortOptions: { [key: string]: SortOrder } = {
      [sort as string]: sortOrder,
    };

    const cartItems = await Cart.find(query)
      .populate('product')
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalCartItems = await Cart.countDocuments(query);

    res.status(200).json({
      cartItems,
      totalPages: Math.ceil(totalCartItems / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred getting cart items.' });
    }
    return res.status(500).json({ error: 'An unknown error occurred.' });
  }
};

const addToCart = async (req: Request, res: Response) => {
  const { error, value } = addToCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { product, quantity, user } = value;

  if (!product || !quantity || !user) {
    return res
      .status(400)
      .json({ message: 'User, product, and quantity are required.' });
  }

  try {
    const existingCartItem = await Cart.findOne({ product, user });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      const updatedCartItem = await existingCartItem.save();
      return res.status(200).json(updatedCartItem);
    } else {
      const cart = new Cart({ product, quantity, user });
      const savedCart = await cart.save();
      return res.status(201).json(savedCart);
    }
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while adding to cart.' });
    }
  }
};

const deleteFromCart = async (req: Request, res: Response) => {
  const { error, value } = deleteFromCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { id } = req.params;
  const { user } = value;

  if (!user) {
    return res.status(400).json({ message: 'User is required.' });
  }

  try {
    const cart = await Cart.findOneAndDelete({ _id: id, user });
    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }
    return res.status(200).json({ message: 'Cart item deleted successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while deleting from cart.' });
    }
  }
};

export { getCartItems, addToCart, deleteFromCart };
