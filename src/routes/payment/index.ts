import { Router } from 'express';
import { createPayment } from '../../controllers/payment';

const router = Router();

router.post('/create-payment', createPayment);

export default router;
