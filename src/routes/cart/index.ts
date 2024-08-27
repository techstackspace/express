import { Router } from 'express';
import {
  addToCart,
  deleteFromCart,
  getCartItems,
} from '../../controllers/cart';
import { authenticateToken } from '../../middleware';

const router = Router();

router.get('/cart', authenticateToken, getCartItems);
router.post('/cart', authenticateToken, addToCart);
router.delete('/cart/:id', authenticateToken, deleteFromCart);

export default router;
