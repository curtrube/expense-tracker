import dbService from '../services/dbService.js';

class AccountModel {
  findAll = async () => {
    const sql = 'SELECT * FROM accounts';
    return await dbService.query(sql);
  };

  findOne = async (accountId) => {
    const sql = `
      SELECT * 
      FROM accounts 
      WHERE account_id = ${accountId}
    `;
    return await dbService.query(sql);
  };

  create = async (accountNumber, accountName, accountBank) => {
    const sql = `
      INSERT INTO accounts(number, name, bank) 
      VALUES('${accountNumber}', '${accountName}', '${accountBank}')
      RETURNING account_id, number, name, bank
    `;
    return await dbService.query(sql);
  };

  update = async (accountId, accountNumber, accountName, accountBank) => {
    const sql = `
      UPDATE accounts 
      SET
        number = '${accountNumber}',
        name = '${accountName}',
        bank = '${accountBank}'
      WHERE account_id = '${accountId}'
      RETURNING account_id, number, name, bank
    `;
    return await dbService.query(sql);
  };

  delete = async (accountId) => {
    const sql = `
      DELETE FROM accounts
      WHERE account_id = '${accountId}'
      RETURNING account_id, name
    `;
    return await dbService.query(sql);
  };
}

export default AccountModel;
