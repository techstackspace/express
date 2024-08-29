import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  toggleLikeProduct,
  updateProduct,
} from '../../controllers/product';
import { authenticateToken } from '../../middleware';
import { uploadMedia as upload } from '../../config/multer/product';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post(
  '/products',
  authenticateToken,
  upload.array('mediaFiles'),
  createProduct
);
router.patch(
  '/products/:id',
  authenticateToken,
  upload.array('mediaFiles'),
  updateProduct
);
router.delete('/products/:id', authenticateToken, deleteProduct);
router.post('/products/:productId/like', authenticateToken, toggleLikeProduct);

export default router;
