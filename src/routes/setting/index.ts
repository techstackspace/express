import { Router } from 'express';
import {
  createOrUpdateProfileSettings,
  deleteProfileSettings,
  getProfileSettings,
} from '../../controllers/setting';

const router = Router();

router.get('/settings/:user', getProfileSettings);
router.post('/settings/:user', createOrUpdateProfileSettings);
router.delete('/settings/:user', deleteProfileSettings);

export default router;
