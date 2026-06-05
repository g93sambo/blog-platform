import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getMyPosts,
  savePost,
  unsavePost,
  getSavedPosts,
  getDashboardStats,
} from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Specific named routes must come BEFORE /:slug wildcard
router.get('/my-posts', protect, getMyPosts);
router.get('/saved', protect, getSavedPosts);
router.get('/dashboard-stats', protect, getDashboardStats);

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/save', protect, savePost);
router.post('/:id/unsave', protect, unsavePost);

export default router;
