import { Router } from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoriesController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.post('/categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
