import { Router } from 'express';
import {
  createOrder,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../../controllers/order';
import { authenticateToken } from '../../middleware';
import { validateRequest } from '../../validation';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../../validation/order';

const router = Router();

router.post(
  '/orders',
  authenticateToken,
  validateRequest(createOrderSchema),
  createOrder
);
router.get('/orders/:id', authenticateToken, getOrder);
router.put(
  '/orders/:id',
  authenticateToken,
  validateRequest(updateOrderStatusSchema),
  updateOrderStatus
);
router.get('/orders', authenticateToken, getAllOrders);

export default router;
