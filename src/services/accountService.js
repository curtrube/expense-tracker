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

const getAccounts = async () => {};

const getAccount = async () => {};

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

export default { createAccount };
