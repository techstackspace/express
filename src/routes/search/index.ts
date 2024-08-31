import { Router } from 'express';
import globalSearch from '../../controllers/search';
import { searchSchema } from '../../validation/search';
import { validateRequest } from '../../validation';

const router = Router();

router.get('/search', validateRequest(searchSchema, 'query'), globalSearch);

export default router;
