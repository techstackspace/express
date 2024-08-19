import { Request, Response } from 'express';
import Product from '../../models/product';
import Order from '../../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, products, shippingAddress, paymentMethod } = req.body;

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    const newOrder = new Order({
      user,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
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
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
