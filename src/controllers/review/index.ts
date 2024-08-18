import { Request, Response } from 'express';
import Product from '../../models/product';
import Review from '../../models/review';
import User from '../../models/user';
import { ObjectId } from 'mongoose';

const getAllReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('reviews');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

const getReviewById = async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId).populate('user').populate('product');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ review });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

const createReview = async (req: Request, res: Response) => {
  const { productId, userId, text, rating, report } = req.body;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ message: 'Product or User not found' });
    }

    const userReviewCount = await Review.countDocuments({ user: userId, product: productId });

    if (userReviewCount >= 5) {
      return res.status(400).json({ message: 'You have already created 5 reviews for this product.' });
    }

    const review = new Review({
      text,
      report,
      rating,
      user: user._id,
      product: product._id,
    });

    await review.save();

    product.reviews = product.reviews || [];
    product.reviews.push(review._id as ObjectId);
    await product.save();
    await product.calculateAverageRating();

    return res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

const updateReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { text, rating, report } = req.body;

  try {
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.text = text || review.text;
    review.report = report || review.report;
    review.rating = rating || review.rating;
    await review.save();

    const product = await Product.findById(review.product);
    if (product) {
      await product.calculateAverageRating();
    }

    return res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const product = await Product.findById(review.product);
    if (product) {
      product.reviews = product.reviews?.filter(
        (r: ObjectId) => r.toString() !== reviewId
      );
      await product.save();
      await product.calculateAverageRating();
    }

    await Review.deleteOne({ _id: reviewId });

    return res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

const toggleLikeReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findById(reviewId);
    const user = await User.findById(userId);

    if (!review || !user) {
      return res.status(404).json({ message: 'Review or User not found' });
    }

    const userIndex = review.likes.findIndex(
      (like) => like.toString() === userId
    );

    if (userIndex === -1) {
      review.likes.push(user._id as unknown as ObjectId);
      await review.save();
      return res.status(200).json({ message: 'Review liked', review });
    } else {
      review.likes.splice(userIndex, 1);
      await review.save();
      return res.status(200).json({ message: 'Review disliked', review });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export { getAllReviews, getReviewById, createReview, updateReview, deleteReview, toggleLikeReview };
