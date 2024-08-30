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

const router = Router();

router.post('/verify-otp', verifyOTP);
router.get('/users', getAllUsers);
router.post('/users/register', createUser);
router.post('/users/login', loginUser);
router.post('/users/logout', logoutUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
