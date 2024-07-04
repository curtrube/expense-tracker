import { Router } from 'express';

import error from '../controllers/errorController.js';

const router = Router();

router.get('*', error);

export default router;
