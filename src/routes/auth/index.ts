import { Router } from 'express';
import { registerUser, deleteUser } from '../../controllers/user/auth';

const router = Router();

router.post('/user/register', registerUser);
router.delete('/user/:id', deleteUser);

export default router;
