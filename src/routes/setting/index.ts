import { Router } from 'express';
import {
  createOrUpdateSettings,
  deleteSettings,
  getSettings,
} from '../../controllers/setting';
import { authenticateToken } from '../../middleware';
import { settingsSchema } from '../../validation/settings';
import { validateRequest } from '../../validation';

const router = Router();

router.get('/settings', authenticateToken, getSettings);
router.post(
  '/settings',
  authenticateToken,
  validateRequest(settingsSchema, 'body'),
  createOrUpdateSettings
);
router.delete('/settings', authenticateToken, deleteSettings);

export default router;
