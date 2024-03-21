import TransactionModel from '../models/transactionModel.js';

export const getTransactions = async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.findAll();
    if (results.length !== 0) {
      res.status(200).json({ transactions: results });
    } else {
      res.status(204).json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.findOne(id);
    if (results.length !== 0) {
      res.status(200).json({ transactions: results });
    } else {
      res.status(204).json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createTransaction = async (req, res) => {
  const { merchant, amount, date, userId, accountId, categoryId } = req.body;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.create(
      merchant,
      amount,
      date,
      userId,
      accountId,
      categoryId
    );
    if (results.length !== 0) {
      res.status(201).json({ transactions: results });
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { merchant, amount, date, userId, accountId, categoryId } = req.body;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.update(
      id,
      merchant,
      amount,
      date,
      userId,
      accountId,
      categoryId
    );
    if (results.length !== 0) {
      res.status(201).json({ transactions: results });
    } else {
      res.json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.delete(id);
    if (results.lenght !== 0) {
      res.status(202).json({ transactions: results });
    }
  } catch (error) {
    console.error(error);
  }
};
