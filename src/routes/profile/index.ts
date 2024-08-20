import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,
  patchProfile,
  createProfile,
} from '../../controllers/profile';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);
router.patch('/profile', patchProfile);
router.post('/profile', createProfile);

export default router;
