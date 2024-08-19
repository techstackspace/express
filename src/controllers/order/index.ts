import { Request, Response } from 'express';
import Order from '../../models/order';
import Cart from '../../models/cart';
import Address from '../../models/address';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, shippingAddress, paymentMethod } = req.body;

    let address = shippingAddress;
    if (!address) {
      const defaultAddress = await Address.findOne({ user, isDefault: true });
      if (!defaultAddress) {
        return res
          .status(400)
          .json({ error: 'No default shipping address found' });
      }
      address = defaultAddress;
    }

    const cartItems = await Cart.find({ user }).populate('product');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'No items in the cart' });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of cartItems) {
      const price = item.product.price;
      const quantity = item.quantity;

      totalAmount += price * quantity;
      orderProducts.push({
        product: item.product._id,
        quantity: quantity,
        price: price,
      });
    }

    const newOrder = new Order({
      user,
      products: orderProducts,
      totalAmount,
      shippingAddress: address,
      paymentMethod,
    });

    await newOrder.save();

    await Cart.deleteMany({ user });

    res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to create order: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products.product');
    if (!order) {
      res.status(404).json({ error: `Order not found` });
    }
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to fetch order: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.orderStatus = req.body.orderStatus || order.orderStatus;
    if (req.body.isPaid) {
      order.isPaid = req.body.isPaid;
      order.paidAt = new Date();
    }
    if (req.body.deliveredAt) {
      order.deliveredAt = new Date(req.body.deliveredAt);
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to update order status: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to fetch orders: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
