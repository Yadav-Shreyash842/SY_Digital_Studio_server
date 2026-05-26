import { Router } from 'express';
import { getBlogBySlug, listBlogs } from '../controllers/blogController.js';

const router = Router();

router.get('/', listBlogs);
router.get('/category/:category', listBlogs);
router.get('/:category/:slug', getBlogBySlug);
router.get('/:slug', getBlogBySlug);

export default router;