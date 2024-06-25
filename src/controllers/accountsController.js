import AccountModel from '../models/accountModel.js';
import accountService from '../services/accountService.js';

export const getAccounts = async (req, res) => {
  const userId = req.user?.user_id;
  if (!userId) {
    res.status(400).json({ message: 'userId required' });
  }
  try {
    const accounts = await accountService.getAccounts(userId);
    if (!accounts) {
      res.status(404).json({ message: 'No accounts found' });
    } else {
      res.status(200).json({ accounts: accounts });
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'No accounts found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getAccount = async (req, res) => {
  const userId = req.user?.user_id;
  const accountId = req.params?.id;

  if (!userId || !accountId) {
    res.status(400).json({ message: 'userId and accountId are required' });
  }

  try {
    const account = await accountService.getAccount(userId, accountId);
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
    } else {
      res.status(200).json(account);
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const createAccount = async (req, res) => {
  const accountData = { ...req.body, userId: req.user?.user_id };
  const newAccount = await accountService.createAccount(accountData);
  try {
    if (newAccount) {
      res.status(201).json(newAccount);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAccount = async (req, res) => {
  const accountData = {
    accountId: req.params?.id,
    ...req.body,
    userId: req.user?.user_id,
  };
  try {
    const updatedAccount = await accountService.updateAccount(accountData);
    if (updatedAccount) {
      res.status(201).json(updatedAccount);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  const accountId = req.params?.id;
  const userId = req.user?.user_id;
  try {
    const deletedAccount = await accountService.deleteAccount(
      accountId,
      userId
    );
    if (deletedAccount) {
      res.status(202).json(deletedAccount);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
