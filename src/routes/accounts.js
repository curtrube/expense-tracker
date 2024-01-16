'use strict';

import { Router } from 'express';
import { 
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount 
} from '../controllers/accounts.js'

export const accounts = Router();

accounts.get('/accounts', getAccounts)
accounts.get('/accounts/:id', getAccount)
accounts.post('/accounts', createAccount)
accounts.put('/accounts/:id', updateAccount)
accounts.delete('/accounts/:id', deleteAccount)