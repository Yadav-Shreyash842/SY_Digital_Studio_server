import { Router } from 'express';
import { body } from 'express-validator';
import { submitContact } from '../controllers/contactController.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', [body('message').notEmpty(), validate], submitContact);

export default router;