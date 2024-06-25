import AccountModel from '../models/accountModel.js';

const validateAccountData = (data) => {
  if (!data) return false;

  const requiredProps = ['number', 'name', 'institution', 'userId'];
  for (const prop of requiredProps) {
    if (!data.hasOwnProperty(prop)) {
      throw new Error(`Account data missing prop: ${prop}`);
    }
  }

  return true;
};

const getAccounts = async (userId) => {
  const accountModel = new AccountModel();
  const dbAccounts = await accountModel.findAll(userId);
  if (!dbAccounts) {
    const error = new Error('No accounts found');
    error.status(404);
    throw error;
  } else {
    const accounts = dbAccounts.map((account) => {
      const { account_id, user_id, ...rest } = account;
      return { accountId: account_id, ...rest, userId: user_id };
    });
    return accounts;
  }
};

const getAccount = async (userId, accountId) => {
  const accountModel = new AccountModel();
  const dbAccount = await accountModel.findOne(userId, accountId);
  if (!dbAccount) {
    const error = new Error('Account not found');
    error.status = 404;
    throw error;
  } else {
    const { user_id, account_id, ...rest } = dbAccount;
    const account = { accountId: account_id, ...rest, userId: user_id };
    return account;
  }
};

const createAccount = async (accountData) => {
  if (!validateAccountData(accountData)) {
    throw new Error('createAccount() failed invalid account data');
  }

  const { number, name, institution, userId } = accountData;
  const accountModel = new AccountModel();
  const account = await accountModel.create(number, name, institution, userId);

  return account;
};

const updateAccount = async (accountData) => {
  const requiredProps = [
    'accountId',
    'number',
    'name',
    'institution',
    'userId',
  ];
  for (const prop of requiredProps) {
    if (!accountData.hasOwnProperty(prop)) {
      throw new Error(`Error updating account missing prop: ${prop}`);
    }
  }
  const { accountId, number, name, institution, userId } = accountData;

  const accountModel = new AccountModel();
  const account = await accountModel.update(
    accountId,
    number,
    name,
    institution,
    userId
  );

  return account;
};

const deleteAccount = async (accountId, userId) => {
  if (!accountId || !userId) {
    throw new Error('deleteAccount() missing required parameters');
  }
  const accountModel = new AccountModel();
  const deletedAccount = await accountModel.delete(accountId, userId);

  return deletedAccount;
};

export default {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
