import TransactionModel from '../models/transactionModel.js';

const validateTransactionData = (data) => {
  if (!data) return false;

  const requiredProps = [
    'merchant',
    'amount',
    'data',
    'userId',
    'accountId',
    'categoryId',
  ];
  for (const prop of requiredProps) {
    if (!data.hasOwn(prop)) {
      throw new Error(`Transaction data missing prop: ${prop}`);
    }
  }

  return true;
};

const createTransaction = async (transactionData) => {
  if (!validateTransactionData(transactionData)) {
    throw new Error('Invalid transaction data');
  }

  const { merchant, amount, date, userId, accountId, categoryId } =
    transactionData;
  const transactionModel = new TransactionModel();
  const transaction = await transactionModel.create(
    merchant,
    amount,
    date,
    userId,
    accountId,
    categoryId
  );
  return transaction;
};

export default { createTransaction };
