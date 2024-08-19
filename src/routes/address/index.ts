import express from 'express';
import {
  createAddress,
  updateAddress,
  deleteAddress,
  getUserAddresses,
} from '../../controllers/address';

const router = express.Router();

router.post('/', createAddress);
router.put('/:addressId', updateAddress);
router.get('/', getUserAddresses);
router.delete('/:addressId', deleteAddress);

export default router;
