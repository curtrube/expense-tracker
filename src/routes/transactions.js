'use strict';

import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from '../controllers/transactions.js';

const transactions = Router();
transactions.get('/transactions', getTransactions);
transactions.get('/transactions/:id', getTransaction);
transactions.post('/transactions', createTransaction);
transactions.put('/transactions/:id', updateTransaction);
transactions.delete('/transactions/:id', deleteTransaction);

export default transactions;
