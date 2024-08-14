import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
} from '../../controllers/user/auth';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users/register', createUser);
router.delete('/users/:id', deleteUser);

export default router;
