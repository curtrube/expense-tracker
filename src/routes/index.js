import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import accountRouter from './accountRoutes.js';
import authRouter from './auth.js';
import categoryRouter from './categoryRoutes.js';
// import errorRouter from './error.js';
import healthRouter from './health.js';
import transactionsRouter from './transactions.js';
import userRouter from './userRoutes.js';

const router = Router();

router.use('/auth', authRouter);
// router.use('/', errorRouter);
router.use('/', healthRouter);
router.use('/', authenticate, userRouter);
router.use('/', authenticate, transactionsRouter);
router.use('/', authenticate, categoryRouter);
router.use('/', authenticate, accountRouter);

export default router;
