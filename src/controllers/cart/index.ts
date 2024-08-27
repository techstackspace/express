import { Request, Response } from 'express';
import Cart from '../../models/cart';

const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems = await Cart.find({ user: req.body.user }).populate(
      'product'
    );
    return res.status(200).json(cartItems);
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred getting cart items.' });
    }
  }
};

const addToCart = async (req: Request, res: Response) => {
  const { product, quantity, user } = req.body;

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
  const { id } = req.params;
  const { user } = req.body;

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
