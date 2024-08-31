import { Router } from 'express';
import createEmailSubscription from '../../controllers/subscribe';
import { subscriptionSchema } from '../../validation/subscribe';
import { validateRequest } from '../../validation';

const router = Router();

router.post(
  '/subscribe',
  validateRequest(subscriptionSchema, 'body'),
  createEmailSubscription
);

export default router;
