import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,
  patchProfile,
  createProfile,
} from '../../controllers/profile';
import { authenticateToken } from '../../middleware';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteProfile);
router.patch('/profile', authenticateToken, patchProfile);
router.post('/profile', authenticateToken, createProfile);

export default router;
