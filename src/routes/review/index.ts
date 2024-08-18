import { Router } from 'express';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  toggleLikeReview,
} from '../../controllers/review';

const router = Router();

router.get('/products/:productId/reviews', getAllReviews);
router.get('/reviews/:reviewId', getReviewById);
router.post('/products/reviews', createReview);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);
router.post('/reviews/:reviewId/like', toggleLikeReview);

export default router;
