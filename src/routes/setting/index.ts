import { Router } from 'express';
import {
  createOrUpdateSettings,
  deleteSettings,
  getSettings,
} from '../../controllers/setting';

const router = Router();

router.get('/settings', getSettings);
router.post('/settings', createOrUpdateSettings);
router.delete('/settings', deleteSettings);

export default router;
