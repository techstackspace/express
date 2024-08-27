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

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', authenticateToken, createProduct);
router.patch('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);
router.post('/products/:productId/like', authenticateToken, toggleLikeProduct);

export default router;
