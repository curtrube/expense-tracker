import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';

const router = Router();
router.post('/login', login);
router.get('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
