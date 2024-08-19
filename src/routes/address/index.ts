import express from 'express';
import {
  createAddress,
  updateAddress,
  deleteAddress,
  getUserAddresses,
} from '../../controllers/address';

const router = express.Router();

router.post('/address', createAddress);
router.put('/address/:addressId', updateAddress);
router.get('/address', getUserAddresses);
router.delete('/address/:addressId', deleteAddress);

export default router;
