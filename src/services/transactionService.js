import TransactionModel from '../models/transactionModel.js';

const getTransactions = async (userId) => {
  const transactionModel = new TransactionModel();
  try {
    const transactions = await transactionModel.findAll(userId);
    if (!transactions) {
      throw new Error('No transactions found');
    }
    return transactions;
  } catch (err) {
    console.error(`Unable to get all transactions: ${err.message}`);
  }
};

const getTransaction = async (transactionId, userId) => {
  if (!transactionId || !userId) {
    throw new Error('Missing required transactionId or userId');
  }
  const transactionModel = new TransactionModel();
  try {
    const transaction = await transactionModel.findOne(transactionId, userId);
    if (!transaction) {
      throw new Error(`Unable to get transaction with Id: ${transactionId}`);
    }
    return transaction;
  } catch (err) {
    console.error(`Unable to get transaction with Id: ${transactionId}`);
  }
};

const createTransaction = async (transactionData) => {
  const requiredProps = ['merchant', 'amount', 'date', 'userId', 'accountId', 'categoryId'];
  for (const prop of requiredProps) {
    if (!Object.keys(transactionData).includes(prop)) {
      throw new Error(`creating transaction missing required prop: ${prop}`);
    }
  }
  const transactionModel = new TransactionModel();
  try {
    const { merchant, amount, date, userId, accountId, categoryId } = transactionData;
    const newTransaction = transactionModel.create(merchant, amount, date, userId, accountId, categoryId);
    if (!newTransaction) {
      throw new Error('Creating new transaction');
    }
    return newTransaction;
  } catch (err) {
    console.error(`Creating new transaction: ${err.message}`);
  }
};

const updateTransaction = async (transactionData) => {
  const requiredProps = ['transactionId', 'merchant', 'amount', 'date', 'userId', 'accountId', 'categoryId'];
  for (let prop of requiredProps) {
    if (!Object.keys(transactionData).includes(prop)) {
      throw new Error(`updating transaction missing required prop: ${prop}`);
    }
  }
  const transactionModel = new TransactionModel();
  try {
    const { transactionId, merchant, amount, date, userId, accountId, categoryId } = transactionData;
    const updatedTransaction = await transactionModel.update(
      transactionId,
      merchant,
      amount,
      date,
      userId,
      accountId,
      categoryId
    );
    if (!updatedTransaction) {
      throw new Error('updating transaction');
    }
    return updatedTransaction;
  } catch (err) {
    console.error(`updating transaction ${err.message}`);
  }
};

const deleteTransaction = async (transactionId, userId) => {
  if (!transactionId || !userId) {
    throw new Error('missing required transactionId or userId');
  }
  const transactionModel = new TransactionModel();
  try {
    const deletedTransaction = await transactionModel.delete(transactionId, userId);
    if (!deletedTransaction) {
      throw new Error(`deleting transaction with id: ${transactionId} `);
    } else {
      return deletedTransaction;
    }
  } catch (err) {
    console.error(`deleting transaction with id ${transactionId}`);
  }
};

export default { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction };
