import { Request, Response } from 'express';
import Subscribe from '../../models/subscribe';

const createEmailSubscription = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscribe = new Subscribe({ email });
    const savedSubscribe = await subscribe.save();
    res
      .status(201)
      .json({ message: 'Email subscribed successfully', savedSubscribe });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export default createEmailSubscription;
