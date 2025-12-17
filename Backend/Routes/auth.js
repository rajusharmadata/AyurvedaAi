import express from 'express';
import { 
    register, 
    login, 
    logout, 
    verifyEmail,
    resendVerificationEmail,
    forgotPassword, 
    resetPassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Protected routes
router.post('/logout', protect, logout);

export default router;