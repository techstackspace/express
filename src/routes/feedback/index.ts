import { Router } from 'express';
import cretaeFeedback from '../../controllers/feedback';

const router = Router();

router.post('/feedback', cretaeFeedback);

export default router;
