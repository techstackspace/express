import { Request, Response } from 'express';
import Order from '../../models/order';
import Cart from '../../models/cart';
import Address from '../../models/address';
import { SortOrder } from 'mongoose';
import { IProduct } from '../../models/product/interface';
import { sendMail } from '../../config/nodemailer';
import User from '../../models/user';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, shippingAddress, paymentMethod, paymentStatus } = req.body;

    if (paymentStatus !== 'successful') {
      return res.status(400).json({ error: 'Payment was not successful' });
    }

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
      const product = item.product as IProduct;
      const price = product.price;
      const quantity = item.quantity;

      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for product: ${product.name}` });
      }

      totalAmount += price * quantity;
      orderProducts.push({
        product: product._id,
        quantity: quantity,
        price: price,
      });

      product.stock -= quantity;
      await product.save();
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

    const userInfo = await User.findById(user);
    if (userInfo && userInfo.email) {
      await sendMail(
        userInfo.email,
        'Order Confirmation',
        `Your order with ID ${newOrder._id} has been placed successfully.`
      );
    }

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

    const userInfo = await User.findById(order.user);
    if (userInfo && userInfo.email) {
      await sendMail(
        userInfo.email,
        'Order Status Updated',
        `Your order with ID ${order._id} status has been updated to ${order.orderStatus}.`
      );
    }

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
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      minDate,
      maxDate,
      user,
      orderStatus,
      minAmount,
      maxAmount,
      isPaid,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const sortOrder: SortOrder = order === 'asc' ? 1 : -1;

    const query: any = {};

    if (user) {
      query.user = user;
    }

    if (orderStatus) {
      query.orderStatus = orderStatus;
    }

    if (minAmount || maxAmount) {
      query.totalAmount = {};
      if (minAmount) query.totalAmount.$gte = Number(minAmount);
      if (maxAmount) query.totalAmount.$lte = Number(maxAmount);
    }

    if (isPaid !== undefined) {
      query.isPaid = isPaid === 'true';
    }

    if (minDate || maxDate) {
      query.createdAt = {};
      if (minDate) query.createdAt.$gte = new Date(minDate as string);
      if (maxDate) query.createdAt.$lte = new Date(maxDate as string);
    }

    if (search) {
      query.$or = [
        {
          'products.product.name': {
            $regex: new RegExp(search as string, 'i'),
          },
        },
        { shippingAddress: { $regex: new RegExp(search as string, 'i') } },
      ];
    }

    const sortOptions: { [key: string]: SortOrder } = {
      [sort as string]: sortOrder,
    };

    const orders = await Order.find(query)
      .populate('user')
      .populate('products.product')
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limitNumber),
      currentPage: pageNumber,
    });
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
