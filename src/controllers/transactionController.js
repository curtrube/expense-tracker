import transactionService from '../services/transactionService.js';

const getTransactions = async (req, res) => {
  const userId = req.user?.user_id;
  try {
    const transactions = await transactionService.getTransactions(userId);
    if (!transactions) {
      res.status(204).json({ message: 'no transactions found' });
    } else {
      res.status(200).json({ transactions });
    }
  } catch (err) {
    console.error(`no transactions found: ${err.message} for user: ${userId}`);
  }
};

const getTransaction = async (req, res) => {
  const transactionId = req.params?.id;
  const userId = req.user?.user_id;
  try {
    const transaction = await transactionService.getTransaction(transactionId, userId);
    if (!transaction) {
      res.status(204).json({ message: `No transaction with Id: ${transactionId}` });
    } else {
      res.status(200).json({ transaction });
    }
  } catch (err) {
    console.error(`unable to get transaction with Id: ${transactionId}: ${err.message}`);
  }
};

const createTransaction = async (req, res) => {
  const transactionData = { ...req.body, userId: req.user?.user_id };
  try {
    const transaction = await transactionService.createTransaction(transactionData);
    if (!transaction) {
      res.status(400).json({ message: 'Error creating transaction' });
    } else {
      res.status(201).json({ transaction });
    }
  } catch (err) {
    console.error(`Creating new transaction: ${err.message}`);
  }
};

const updateTransaction = async (req, res) => {
  const transactionData = { ...req.body, transactionId: req.params?.id, userId: req.user?.user_id };
  try {
    const transaction = await transactionService.updateTransaction(transactionData);
    if (!transaction) {
      res.status(400).json({ message: 'Error updating transaction with id' });
    } else {
      res.status(201).json({ transaction });
    }
  } catch (err) {
    console.error(`updating transaction: ${err.message}`);
  }
};

const deleteTransaction = async (req, res) => {
  const transactionId = req.params?.id;
  const userId = req.user?.user_id;
  if (!transactionId || !userId) {
    return res.status(400).json({ message: 'missing required transactionId or user in request' });
  }
  try {
    const transaction = await transactionService.deleteTransaction(transactionId, userId);
    if (!transaction) {
      res.status(400).json({ message: 'Error deleting transaction' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(`deleting transaction with id ${transactionId}`);
  }
};

export default { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction };
