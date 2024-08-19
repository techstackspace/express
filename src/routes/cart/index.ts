import { Router } from 'express';
import {
  addToCart,
  deleteFromCart,
  getCartItems,
} from '../../controllers/cart';

const router = Router();

router.get('/cart', getCartItems);
router.post('/cart', addToCart);
router.delete('/cart/:id', deleteFromCart);

export default router;
