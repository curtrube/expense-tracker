'use strict';

import { Router } from 'express';

import {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
} from '../controllers/categories.js'

export const categories = Router();

console.log('inside routes/categories')

categories.get('/categories', getCategories)
categories.get('/categories/:id', getCategory)
categories.post('/categories/', createCategory)
categories.put('/categories/:id', updateCategory)
categories.delete('/categories/:id', deleteCategory)
