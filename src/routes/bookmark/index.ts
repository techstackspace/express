import { Router } from 'express';
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from '../../controllers/bookmark';

const router = Router();

router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', addBookmark);
router.delete('/bookmarks/:id', removeBookmark);

export default router;
