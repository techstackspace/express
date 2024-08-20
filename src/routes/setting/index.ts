import express from 'express';
import {
  createOrUpdateProfileSettings,
  deleteProfileSettings,
  getProfileSettings,
} from '../../controllers/setting';

const router = express.Router();

router.get('/settings', getProfileSettings);
router.post('/settings', createOrUpdateProfileSettings);
router.delete('/settings', deleteProfileSettings);

export default router;
