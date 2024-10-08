import { Request, Response } from 'express';
import Feedback from '../../models/feedback';
import User from '../../models/user';
import { sendMail } from '../../config/nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import { feedbackSchema } from '../../validation/feedback';

function isJwtPayload(
  user: string | JwtPayload | undefined
): user is JwtPayload {
  return (user as JwtPayload)?.id !== undefined;
}

const createFeedback = async (req: Request, res: Response) => {
  const userAgent = req.headers['user-agent'] || '';
  let detectedPlatform = 'web';

  if (/mobile/i.test(userAgent)) {
    detectedPlatform = 'mobile';
  } else if (/tablet|ipad/i.test(userAgent)) {
    detectedPlatform = 'tablet';
  } else if (/macintosh|windows|linux/i.test(userAgent)) {
    detectedPlatform = 'desktop';
  }

  const browserInfo = userAgent;

  const { error, value } = feedbackSchema.validate({
    ...req.body,
    platform: detectedPlatform,
    browserInfo,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    userId,
    productId,
    orderId,
    rating,
    feedbackType,
    title,
    comments,
    suggestions,
    dateSubmitted,
    images,
    contactPermission,
    appVersion,
  } = value;

  try {
    const feedback = new Feedback({
      userId,
      productId,
      orderId,
      rating,
      feedbackType,
      title,
      comments,
      suggestions,
      dateSubmitted,
      images,
      contactPermission,
      platform: detectedPlatform,
      appVersion,
      browserInfo,
    });

    const savedFeedback = await feedback.save();

    if (isJwtPayload(req.user)) {
      if (contactPermission) {
        const user = await User.findById(req.user?.id);
        if (user) {
          const userEmail = user?.email;
          const subject = 'Thank You for Your Feedback!';
          const text = `<p>Dear ${user?.name},</p><p>Thank you for your feedback on our ${feedbackType}.</p><p>Best regards,<br>TechStackSpace Shop</p>`;
          await sendMail(userEmail, subject, text);
        }
      }
    }

    return res.status(201).json({
      message: 'Feedback submitted successfully.',
      feedbackId: savedFeedback._id,
      submittedAt: savedFeedback.dateSubmitted,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while submitting feedback.' });
    }
  }
};

export default createFeedback;
