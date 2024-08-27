import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
} from '../../controllers/user';
import { authenticateToken } from '../../middleware';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/register', createUser);
router.post('/users/login', loginUser);
router.post('/users/logout', logoutUser);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
