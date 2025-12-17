import express from 'express';
import { protect } from '../middleware/auth.js';
import { getUserProfile, getUserDashboard } from '../controllers/userController.js';

const router = express.Router();

// User profile and dashboard routes
router.get('/profile', protect, getUserProfile);
router.get('/dashboard', protect, getUserDashboard);

export default router;
