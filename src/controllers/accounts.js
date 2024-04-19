import AccountModel from '../models/accountModel.js';

export const getAccounts = async (req, res) => {
  const accountModel = new AccountModel();
  try {
    const accounts = await accountModel.findAll();
    if (accounts) {
      res.status(200).json({ accounts: accounts });
    } else {
      res.status(204).json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAccount = async (req, res) => {
  if (req.params && req.params.id) {
    const { id } = req.params;
    const accountModel = new AccountModel();
    try {
      const accounts = await accountModel.findOne(id);
      if (accounts) {
        res.status(200).json({ accounts: accounts });
      } else {
        res.status(204).json({ accounts: [] });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res
      .status(400)
      .json({ message: 'error missing account id in query params' });
  }
};

export const createAccount = async (req, res) => {
  if (req.body && req.body.number && req.body.name && req.body.bank) {
    const { number, name, bank } = req.body;
    const accountModel = new AccountModel();
    try {
      const accounts = await accountModel.create(number, name, bank);
      if (accounts) {
        res.status(201).json({ accounts: accounts });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(400).json({
      message: 'error missing account number, name or bank in req.body',
    });
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
