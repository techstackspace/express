import { Request, Response } from 'express';
import axios from 'axios';
import Order from '../../models/order';
import { error } from '../../config/debugger';

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { totalAmount, email, orderId } = req.body;

    const paymentData = {
      tx_ref: `order-${orderId}`,
      amount: totalAmount,
      currency: 'NGN',
      redirect_url: 'https://techstackspace.com/payment/callback',
      payment_options: 'card, banktransfer, ussd',
      customer: {
        email,
      },
      customizations: {
        title: 'TechStackSpace Store',
        description: 'Payment for items in cart',
        logo: 'https://res.cloudinary.com/bizstak/image/upload/v1724889968/likqkw7ggv6jpqb9akwo.avif',
      },
    };

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

export const handlePaymentCallback = async (req: Request, res: Response) => {
  try {
    const { tx_ref, status } = req.body;

    if (status === 'successful') {
      const paymentVerificationResponse = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${tx_ref}/verify`,
        {
          headers: {
            Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      if (paymentVerificationResponse.data.status === 'success') {
        const { orderId } = paymentVerificationResponse.data.data;
        const order = await Order.findById(orderId);
        if (order) {
          order.isPaid = true;
          order.paidAt = new Date();
          await order.save();
          res
            .status(200)
            .json({ message: 'Payment successful and order updated' });
        } else {
          res.status(404).json({ error: 'Order not found' });
        }
      } else {
        res.status(400).json({ error: 'Payment verification failed' });
      }
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: 'Failed to handle payment callback' });
  }
};
