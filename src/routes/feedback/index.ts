import { Router } from 'express';
import cretaeFeedback from '../../controllers/feedback';
import { authenticateToken } from '../../middleware';

const router = Router();

router.post('/feedback', authenticateToken, cretaeFeedback);

export default router;
