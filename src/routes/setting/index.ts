import { Router } from 'express';
import {
  createOrUpdateSettings,
  deleteSettings,
  getSettings,
} from '../../controllers/setting';
import { authenticateToken } from '../../middleware';

const router = Router();

router.get('/settings', authenticateToken, getSettings);
router.post('/settings', authenticateToken, createOrUpdateSettings);
router.delete('/settings', authenticateToken, deleteSettings);

export default router;
