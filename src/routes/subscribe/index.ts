import { Router } from 'express';
import createEmailSubscription from '../../controllers/subscribe';

const router = Router();

router.post('/subscribe', createEmailSubscription);

export default router;
