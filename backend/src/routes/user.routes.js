import { Router } from 'express';
import { getUserProfile, updateProfile, changePassword, getPostsByUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Named routes before wildcard :id
router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateProfile);
router.put('/me/password', protect, changePassword);

router.get('/:id', getUserProfile);
router.get('/:id/posts', getPostsByUser);

export default router;
