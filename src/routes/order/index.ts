import express from 'express';
import {
  createOrder,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../../controllers/order';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrderStatus);
router.get('/orders', getAllOrders);

export default router;
