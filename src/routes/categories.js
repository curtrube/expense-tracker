import { Router } from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/categoriesController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.post('/categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
