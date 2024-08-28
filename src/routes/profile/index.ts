import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,
  patchProfile,
  createProfile,
} from '../../controllers/profile';
import { authenticateToken } from '../../middleware';
import upload from '../../config/multer';

const router = express.Router();

router.get('/profile', getProfile);
router.put(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  updateProfile
);
router.delete('/profile', authenticateToken, deleteProfile);
router.patch(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  patchProfile
);
router.post(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  createProfile
);

export default router;
