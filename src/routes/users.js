import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:username', getUser);
router.post('/users', createUser);
router.delete('/users', deleteUser);

export default router;
