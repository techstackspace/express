import { Router } from 'express';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  toggleLikeReview,
  reportReview,
} from '../../controllers/review';
import { authenticateToken } from '../../middleware';
import { reviewSchema } from '../../validation/review';
import { validateRequest } from '../../validation';

const router = Router();

router.get('/products/:productId/reviews', getAllReviews);
router.get('/reviews/:reviewId', getReviewById);
router.post(
  '/products/reviews',
  authenticateToken,
  validateRequest(reviewSchema),
  createReview
);
router.put(
  '/reviews/:reviewId',
  authenticateToken,
  validateRequest(reviewSchema),
  updateReview
);
router.delete('/reviews/:reviewId', authenticateToken, deleteReview);
router.post('/reviews/:reviewId/like', authenticateToken, toggleLikeReview);
router.post('/reviews/:reviewId/report', authenticateToken, reportReview);

export default router;
