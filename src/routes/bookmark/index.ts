import { Router } from 'express';
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from '../../controllers/bookmark';
import { authenticateToken } from '../../middleware';

const router = Router();

router.get('/bookmarks', authenticateToken, getBookmarks);
router.post('/bookmarks', authenticateToken, addBookmark);
router.delete('/bookmarks/:id', authenticateToken, removeBookmark);

export default router;
