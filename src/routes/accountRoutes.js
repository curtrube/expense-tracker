import { Router } from 'express';

import accountController from '../controllers/accountController.js';

const router = Router();

router.get('/accounts', accountController.getAccounts);
router.get('/accounts/:id', accountController.getAccount);
router.post('/accounts', accountController.createAccount);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);

export default router;
