'use strict';

import { Router } from 'express';

import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/categories.js';

const categories = Router();

categories.get('/categories', getCategories);
categories.get('/categories/:id', getCategory);
categories.post('/categories/', createCategory);
categories.put('/categories/:id', updateCategory);
categories.delete('/categories/:id', deleteCategory);

export default categories;
