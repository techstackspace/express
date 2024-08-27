import { Router } from 'express';
import {
  createOrder,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../../controllers/order';
import { authenticateToken } from '../../middleware';

const router = Router();

router.post('/orders', authenticateToken, createOrder);
router.get('/orders/:id', authenticateToken, getOrder);
router.put('/orders/:id', authenticateToken, updateOrderStatus);
router.get('/orders', authenticateToken, getAllOrders);

export default router;
