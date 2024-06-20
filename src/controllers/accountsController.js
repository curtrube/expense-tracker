import AccountModel from '../models/accountModel.js';
import accountService from '../services/accountService.js';

export const getAccounts = async (req, res) => {
  const userId = req.user?.user_id;
  try {
    const accounts = await accountService.getAccounts(userId);
    if (accounts) {
      res.status(200).json({ accounts: accounts });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAccount = async (req, res) => {
  const userId = req.user?.user_id;
  const accountId = req.params?.id;
  try {
    const account = await accountService.getAccount(userId, accountId);
    if (account) {
      res.status(200).json(account);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const accountData = { ...req.body, userId: req.user.user_id };
    const newAccount = await accountService.createAccount(accountData);
    if (newAccount) {
      res.status(201).json(newAccount);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAccount = async (req, res) => {
  if (req.params && req.params.id) {
    const { id } = req.params;
    const { number, name, bank } = req.body;
    const accountModel = new AccountModel();
    try {
      const accounts = await accountModel.update(id, number, name, bank);
      if (accounts) {
        res.status(201).json({ accounts: accounts });
      } else {
        res.json({ accounts: [] });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res
      .status(400)
      .json({ message: 'error missing id in request params' });
  }
};

export const deleteAccount = async (req, res) => {
  if (req.params && req.params.id) {
    const { id } = req.params;
    const accountModel = new AccountModel();
    try {
      const accounts = await accountModel.delete(id);
      if (accounts && accounts.length !== 0) {
        res.status(202).json({ accounts: accounts });
      } else {
        res.json({ accounts: [] });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res
      .status(400)
      .json({ message: 'error missing id in request params' });
  }
};
