import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './users.js';
import healthRouter from './health.js';
import accountsRouter from './accounts.js';
import categoriesRouter from './categories.js';
import transactionsRouter from './transactions.js';
import errorRouter from './error.js';

const router = Router();

router.use('/', healthRouter);
router.use('/', authRouter);
router.use('/', usersRouter);
router.use('/', categoriesRouter);
router.use('/', transactionsRouter);
router.use('/', accountsRouter);
router.use('/', errorRouter);

export default router;
