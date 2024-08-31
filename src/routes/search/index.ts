import { Router } from 'express';
import globalSearch from '../../controllers/search';

const router = Router();

router.get('/search', globalSearch);

export default router;
