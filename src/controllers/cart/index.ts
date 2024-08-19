import { Request, Response } from 'express';
import { error } from '../../config/debugger';
import Cart from '../../models/cart';

const getCartItems = async (_req: Request, res: Response) => {
  try {
    const cartItems = await Cart.find().populate('product');
    return res.status(200).json(cartItems);
  } catch (err) {
    if (err instanceof Error) {
      error('Error getting cart items:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred getting cart items.' });
    }
  }
};

const addToCart = async (req: Request, res: Response) => {
  const { product, quantity } = req.body;
  if (!product || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product and quantity are required.' });
  }

  try {
    const existingCartItem = await Cart.findOne({ product });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      const updatedCartItem = await existingCartItem.save();
      return res.status(200).json(updatedCartItem);
    } else {
      const cart = new Cart({ product, quantity });
      const savedCart = await cart.save();
      return res.status(201).json(savedCart);
    }
  } catch (err) {
    if (err instanceof Error) {
      error('Error adding to cart:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred while adding to cart.' });
    }
  }
};

const deleteFromCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }
    return res.status(200).json({ message: 'Cart item deleted successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      error('Error deleting from cart:', err.message);
      return res
        .status(500)
        .json({ error: 'An error occurred while deleting from cart.' });
    }
  }
};

export { getCartItems, addToCart, deleteFromCart };
