import { Request, Response } from 'express';
import Feedback from '../../models/feedback';
import { error } from '../../config/debugger';

const createFeedback = async (req: Request, res: Response) => {
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
  } = req.body;

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

  if (!userId || !productId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      error:
        "Invalid request. The 'userId', 'productId', and 'rating' fields are required, and 'rating' must be a number between 1 and 5.",
    });
  }

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

    return res.status(201).json({
      message: 'Feedback submitted successfully.',
      feedbackId: savedFeedback._id,
      submittedAt: savedFeedback.dateSubmitted,
    });
  } catch (err) {
    if (err instanceof Error) {
      error('Error saving feedback:', err.message);
    return res
      .status(500)
      .json({ error: 'An error occurred while submitting feedback.' });
    }
  }
};

export default createFeedback;
