import { Router } from 'express';
import register from '../../../controllers/user/auth/register';

const router = Router();

router.post('/user/register', register);

export default router;
