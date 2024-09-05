import { Router } from 'express';
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  resetPassword,
  verifyOTP,
} from '../../controllers/user';
import { authenticateToken } from '../../middleware';
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyOTPSchema,
} from '../../validation/user';
import { validateRequest } from '../../validation';

const router = Router();

router.post('/verify-otp', validateRequest(verifyOTPSchema), verifyOTP);
router.get('/users', getAllUsers);
router.post('/users/register', validateRequest(registerUserSchema), createUser);
router.post('/users/login', validateRequest(loginUserSchema), loginUser);
router.post('/users/logout', logoutUser);
router.post(
  '/forgot-password',
  validateRequest(forgotPasswordSchema),
  forgotPassword
);
router.post(
  '/reset-password',
  validateRequest(resetPasswordSchema),
  resetPassword
);
router.get('/users/:id', getUserById);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
