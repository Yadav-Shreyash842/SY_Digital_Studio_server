import { Router } from 'express';
import { body } from 'express-validator';
import { createService, deleteService, getServices, updateService } from '../controllers/serviceController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.get('/', getServices);
router.post('/', protect, authorize('admin'), [body('name').notEmpty(), body('description').notEmpty(), body('price').notEmpty(), body('deliveryTime').notEmpty(), validate], createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;