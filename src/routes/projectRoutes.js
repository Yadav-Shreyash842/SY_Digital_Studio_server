import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { createProject, listClientProjects, updateProject, uploadProjectFile } from '../controllers/projectController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const storage = multer.diskStorage({
  destination: (_, __, callback) => callback(null, 'uploads'),
  filename: (_, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });
const router = Router();

router.get('/', protect, listClientProjects);
router.post('/', protect, [body('title').notEmpty(), body('description').notEmpty(), validate], createProject);
router.put('/:id', protect, authorize('admin'), updateProject);
router.post('/:id/files', protect, upload.single('file'), uploadProjectFile);

export default router;