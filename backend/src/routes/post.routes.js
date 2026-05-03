import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getMyPosts,
} from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/my-posts', protect, getMyPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);

export default router;
