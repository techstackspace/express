import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  verifyOTP,
} from '../../controllers/user';
import { authenticateToken } from '../../middleware';
import {
  loginUserSchema,
  registerUserSchema,
  verifyOTPSchema,
} from '../../validation/user';
import { validateRequest } from '../../validation';

const router = Router();

router.post('/verify-otp', validateRequest(verifyOTPSchema), verifyOTP);
router.get('/users', getAllUsers);
router.post('/users/register', validateRequest(registerUserSchema), createUser);
router.post('/users/login', validateRequest(loginUserSchema), loginUser);
router.post('/users/logout', logoutUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
