import { Router } from 'express';
import multer from 'multer';
import {
	createBlogPost,
	createGalleryImage,
	createTeamMember,
	createTestimonial,
	deleteBlogPost,
	deleteGalleryImage,
	deleteTeamMember,
	deleteTestimonial,
	getAdminDashboard,
	getClients,
	getContacts,
	getProjects,
	getUsers,
	updateBlogPost,
	updateGalleryImage,
	updateTeamMember,
	updateTestimonial,
} from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/auth.js';

const storage = multer.diskStorage({
	destination: (_, __, callback) => callback(null, 'uploads'),
	filename: (_, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const router = Router();

router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);
router.get('/clients', protect, authorize('admin'), getClients);
router.get('/projects', protect, authorize('admin'), getProjects);
router.get('/users', protect, authorize('admin'), getUsers);
router.get('/contacts', protect, authorize('admin'), getContacts);
router.post('/team', protect, authorize('admin'), createTeamMember);
router.put('/team/:id', protect, authorize('admin'), updateTeamMember);
router.delete('/team/:id', protect, authorize('admin'), deleteTeamMember);
router.post('/testimonials', protect, authorize('admin'), createTestimonial);
router.put('/testimonials/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/testimonials/:id', protect, authorize('admin'), deleteTestimonial);
router.post('/gallery', protect, authorize('admin'), createGalleryImage);
router.put('/gallery/:id', protect, authorize('admin'), updateGalleryImage);
router.delete('/gallery/:id', protect, authorize('admin'), deleteGalleryImage);
router.post('/blogs', protect, authorize('admin'), upload.single('thumbnail'), createBlogPost);
router.put('/blogs/:id', protect, authorize('admin'), upload.single('thumbnail'), updateBlogPost);
router.delete('/blogs/:id', protect, authorize('admin'), deleteBlogPost);

export default router;