import TransactionModel from '../models/transactionModel.js';

export const getTransactions = async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const transactions = await transactionModel.findAll();
    if (transactions) {
      res.status(200).json({ transactions: transactions });
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
    const transaction = await transactionModel.findOne(id);
    if (transaction) {
      res.status(200).json({ transactions: [transaction] });
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
    const transaction = await transactionModel.create(
      merchant,
      amount,
      date,
      userId,
      accountId,
      categoryId
    );
    if (transaction) {
      res.status(201).json({ transactions: [transaction] });
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
    const transaction = await transactionModel.update(
      id,
      merchant,
      amount,
      date,
      userId,
      accountId,
      categoryId
    );
    if (transaction) {
      res.status(201).json({ transactions: [transaction] });
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
    const transaction = await transactionModel.delete(id);
    if (transaction) {
      res.status(202).json({ transactions: [transaction] });
    }
  } catch (error) {
    console.error(error);
  }
};
