import { Router } from 'express';

import accountsRouter from './accountRoutes.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import healthRouter from './health.js';
import categoriesRouter from './categories.js';
import transactionsRouter from './transactions.js';
import errorRouter from './error.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRouter);
// router.use('/', errorRouter);
router.use('/', healthRouter);
router.use('/', authenticate, usersRouter);
router.use('/', authenticate, transactionsRouter);
router.use('/', authenticate, categoriesRouter);
router.use('/', authenticate, accountsRouter);

export default router;
