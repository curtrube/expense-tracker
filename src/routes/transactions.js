import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from '../controllers/transactionsController.js';

const router = Router();

router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransaction);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;
