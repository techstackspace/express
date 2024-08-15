import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from '../../controllers/comment';

const router = Router();

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments', createComment);
router.patch('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router;
