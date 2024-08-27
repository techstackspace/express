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

const router = Router();

router.get('/products/:productId/reviews', getAllReviews);
router.get('/reviews/:reviewId', getReviewById);
router.post('/products/reviews', authenticateToken, createReview);
router.put('/reviews/:reviewId', authenticateToken, updateReview);
router.delete('/reviews/:reviewId', authenticateToken, deleteReview);
router.post('/reviews/:reviewId/like', authenticateToken, toggleLikeReview);
router.post('/reviews/:reviewId/report', authenticateToken, reportReview);

export default router;
