import errorController from '../controllers/errorController.js';
import { Router } from 'express';

const router = Router();

router.get('*', errorController);

export default router;
