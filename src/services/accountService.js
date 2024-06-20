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
  if (!userId) {
    throw new Error('Retrieving accounts missing userId');
  }
  const accountModel = new AccountModel();
  const dbAccounts = await accountModel.findAll(userId);

  const accounts = dbAccounts.map((account) => {
    const { account_id, user_id, ...rest } = account;
    return { userId: user_id, accountId: account_id, ...rest };
  });

  return accounts;
};

const getAccount = async (userId, accountId) => {
  if (!userId || !accountId) {
    throw new Error('Retrieving account misssing userId or accountId');
  }
  const accountModel = new AccountModel();
  const dbAccount = await accountModel.findOne(userId, accountId);

  const { user_id, account_id, ...rest } = dbAccount;
  const account = { userId: user_id, accountId: account_id, ...rest };

  return account;
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

const deleteAccount = async () => {};

export default { getAccounts, getAccount, createAccount, deleteAccount };
