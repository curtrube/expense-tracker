import { Router } from 'express';

import categoryController from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post('/categories/', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;
