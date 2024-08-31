import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,
  patchProfile,
  createProfile,
} from '../../controllers/profile';
import { authenticateToken } from '../../middleware';
import { uploadImage as upload } from '../../config/multer/profile';
import { profileSchema } from '../../validation/profile';
import { validateRequest } from '../../validation';

const router = express.Router();

router.get('/profile', getProfile);
router.put(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  validateRequest(profileSchema),
  updateProfile
);
router.delete('/profile', authenticateToken, deleteProfile);
router.patch(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  validateRequest(profileSchema),
  patchProfile
);
router.post(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  validateRequest(profileSchema),
  createProfile
);

export default router;
