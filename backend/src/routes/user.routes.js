import { Router } from 'express';
import { getUserProfile, updateProfile, getPostsByUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/:id', getUserProfile);
router.get('/:id/posts', getPostsByUser);
router.put('/me', protect, updateProfile);

export default router;
