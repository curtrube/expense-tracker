import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './users.js';
import healthRouter from './health.js';
import accountsRouter from './accounts.js';
import categoriesRouter from './categories.js';
import transactionsRouter from './transactions.js';
import errorRouter from './error.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use('/', authRouter);
// router.use('/', errorRouter);
router.use('/', healthRouter);
router.use('/', authenticate, usersRouter);
router.use('/', authenticate, transactionsRouter);
router.use('/', authenticate, categoriesRouter);
router.use('/', authenticate, accountsRouter);

export default router;
