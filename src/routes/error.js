import error from '../controllers/errorController.js';
import { Router } from 'express';

const router = Router();

router.get('*', error);

export default router;
