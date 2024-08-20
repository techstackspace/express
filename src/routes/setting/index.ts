import { Router } from 'express';
import {
  createOrUpdateProfileSettings,
  deleteProfileSettings,
  getProfileSettings,
} from '../../controllers/setting';

const router = Router();

router.get('/settings', getProfileSettings);
router.post('/settings', createOrUpdateProfileSettings);
router.delete('/settings', deleteProfileSettings);

export default router;
