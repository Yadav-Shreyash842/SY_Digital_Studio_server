import { Router } from 'express';
import { body } from 'express-validator';
import { forgotPassword, login, logout, me, resetPassword, signup, verifyEmail } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/signup', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 8 }), validate], signup);
router.post('/verify-email', verifyEmail);
router.post('/login', [body('email').isEmail(), body('password').notEmpty(), validate], login);
router.post('/logout', logout);
router.get('/me', protect, me);
router.post('/forgot-password', [body('email').isEmail(), validate], forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 8 }), validate], resetPassword);

export default router;