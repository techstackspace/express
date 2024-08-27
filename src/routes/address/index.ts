import express from 'express';
import {
  createAddress,
  updateAddress,
  deleteAddress,
  getUserAddresses,
} from '../../controllers/address';
import { authenticateToken } from '../../middleware';

const router = express.Router();

router.post('/address', authenticateToken, createAddress);
router.put('/address/:addressId', authenticateToken, updateAddress);
router.get('/address', authenticateToken, getUserAddresses);
router.delete('/address/:addressId', authenticateToken, deleteAddress);

export default router;
