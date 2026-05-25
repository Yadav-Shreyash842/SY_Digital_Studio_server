import { Router } from 'express';
import { body } from 'express-validator';
import { createMessage, getClientDashboard, hireService, updateClientProfile } from '../controllers/clientController.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.get('/dashboard', protect, getClientDashboard);
router.patch('/profile', protect, updateClientProfile);
router.post('/messages', protect, [body('body').notEmpty(), validate], createMessage);
router.post('/hire', protect, [body('serviceId').notEmpty(), validate], hireService);

export default router;