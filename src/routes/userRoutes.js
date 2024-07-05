import { Router } from 'express';

import userController from '../controllers/userController.js';

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:username', userController.getUser);
router.post('/users', userController.createUser);
router.delete('/users', userController.deleteUser);

export default router;
