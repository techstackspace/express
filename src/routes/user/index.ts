import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from '../../controllers/user';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/register', createUser);
router.delete('/users/:id', deleteUser);

export default router;
