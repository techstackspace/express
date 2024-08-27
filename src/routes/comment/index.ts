import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  toggleLikeComment,
  updateComment,
} from '../../controllers/comment';
import { authenticateToken } from '../../middleware';

const router = Router();

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments', authenticateToken, createComment);
router.patch('/comments/:id', authenticateToken, updateComment);
router.delete('/comments/:id', authenticateToken, deleteComment);
router.post('/comments/:commentId/like', authenticateToken, toggleLikeComment);

export default router;
