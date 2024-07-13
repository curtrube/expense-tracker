import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import accountRouter from './accountRoutes.js';
import authRouter from './auth.js';
import categoryRouter from './categoryRoutes.js';
// import errorRouter from './error.js';
import healthRouter from './health.js';
import transactionRouter from './transactionRoutes.js';
import userRouter from './userRoutes.js';

const router = Router();

router.use('/auth', authRouter);
// router.use('/', errorRouter);
router.use('/', healthRouter);
router.use('/', authenticate, accountRouter);
router.use('/', authenticate, categoryRouter);
router.use('/', authenticate, transactionRouter);
router.use('/', authenticate, userRouter);

export default router;
