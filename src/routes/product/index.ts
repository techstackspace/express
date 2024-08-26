import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  toggleLikeProduct,
  updateProduct,
  // getProductBySlug,
  // getAllPublishedProducts,
} from '../../controllers/product';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/products/:productId/like', toggleLikeProduct);
// router.get('/products/:slug', getProductBySlug);
// router.get('/products/published', getAllPublishedProducts);

export default router;
