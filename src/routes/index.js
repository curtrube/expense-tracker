import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './users.js';
import healthRouter from './health.js';
import accountsRouter from './accounts.js';
import categoriesRouter from './categories.js';
import transactionsRouter from './transactions.js';
import errorRouter from './error.js';
import { authenticateToken } from '../middleware/authToken.js';

const router = Router();

router.use('/', authRouter);
// router.use('/', errorRouter);
router.use('/', healthRouter);
router.use('/', authenticateToken, usersRouter);
router.use('/', authenticateToken, transactionsRouter);
router.use('/', authenticateToken, categoriesRouter);
router.use('/', authenticateToken, accountsRouter);

export default router;
