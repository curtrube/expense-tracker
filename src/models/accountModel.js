import dbService from '../services/dbService.js';

class AccountModel {
  findAll = async () => {
    const sql = 'SELECT * FROM accounts;';
    return await dbService.query(sql);
  };

  findOne = async (accountId) => {
    const query = {
      text: 'SELECT * FROM accounts WHERE account_id = $1;',
      values: [accountId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (accountNumber, accountName, accountBank) => {
    const query = {
      text: `
        INSERT INTO accounts(number, name, bank) 
        VALUES($1, $2, $3)
        RETURNING account_id, number, name, bank;
      `,
      values: [accountNumber, accountName, accountBank],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (accountId, accountNumber, accountName, accountBank) => {
    const query = {
      text: `
        UPDATE accounts 
        SET
          number = $1, 
          name = $2,
          bank = $3 
        WHERE account_id = $4
        RETURNING account_id, number, name, bank;
      `,
      values: [accountNumber, accountName, accountBank, accountId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (accountId) => {
    const query = {
      text: `
        DELETE FROM accounts
        WHERE account_id = $1 
        RETURNING account_id, name;
      `,
      values: [accountId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default AccountModel;
