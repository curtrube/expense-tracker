import AccountModel from '../models/accountModel.js';

export const getAccounts = async (req, res) => {
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.findAll();
    if (results.length !== 0) {
      res.status(200).json({ accounts: results });
    } else {
      res.status(204).json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAccount = async (req, res) => {
  const { id } = req.params;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.findOne(id);
    if (results.length !== 0) {
      res.status(200).json({ accounts: results });
    } else {
      res.status(204).json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createAccount = async (req, res) => {
  // TODO: input needs to be sanitized
  // TODO: should we allow duplicate accounts?
  const { number, name, bank } = req.body;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.create(number, name, bank);
    if (results.length !== 0) {
      res.status(201).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { number, name, bank } = req.body;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.update(id, number, name, bank);
    if (results.length !== 0) {
      res.status(201).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.delete(id);
    if (results.length !== 0) {
      res.status(202).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};
