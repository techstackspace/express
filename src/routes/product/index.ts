import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  toggleLikeProduct,
  updateProduct,
  getProductsByUser,
} from '../../controllers/product';
import { authenticateToken } from '../../middleware';
import { uploadMedia as upload } from '../../config/multer/product';
import { validateRequest } from '../../validation';
import { productValidationSchema } from '../../validation/product';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/users/:userId/products', getProductsByUser);
router.post(
  '/products',
  authenticateToken,
  upload.array('mediaFiles'),
  validateRequest(productValidationSchema),
  createProduct
);
router.patch(
  '/products/:id',
  authenticateToken,
  upload.array('mediaFiles'),
  validateRequest(productValidationSchema),
  updateProduct
);
router.delete('/products/:id', authenticateToken, deleteProduct);
router.post('/products/:productId/like', authenticateToken, toggleLikeProduct);

export default router;
