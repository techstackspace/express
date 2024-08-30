import { Request, Response } from 'express';
import Subscribe from '../../models/subscribe';
import User from '../../models/user';
import { JwtPayload } from 'jsonwebtoken';
import { sendMail } from '../../config/nodemailer';

function isJwtPayload(user: string | JwtPayload | undefined): user is JwtPayload {
  return (user as JwtPayload)?.id !== undefined;
}

const createEmailSubscription = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscribe = new Subscribe({ email });
    const savedSubscribe = await subscribe.save();

    if (isJwtPayload(req.user)) {
      const userInfo = await User.findById(req.user?.id);
      if (userInfo) {
        const userEmail = userInfo.email;
        const subject = 'Subscription Confirmation';
        const text = `<p>Dear Subscriber,</p><p>Thank you for subscribing to our newsletter. We're excited to keep you updated with our latest news and offers.</p><p>Best regards,\nTechStackSpace Shop`;

        await sendMail(userEmail, subject, text);
      }
    }

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
