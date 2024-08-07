import dbService from '../services/dbService.js';

class AccountModel {
  findAll = async (userId) => {
    const query = {
      text: `
        SELECT account_id, number, name, type, institution, user_id
        FROM accounts
        WHERE user_id = $1;
      `,
      values: [userId],
    };
    return await dbService.query(query);
  };

  findOne = async (userId, accountId) => {
    const query = {
      text: `
        SELECT account_id, number, name, type, institution, user_id
        FROM accounts
        WHERE account_id = $1 AND user_ID = $2;
      `,
      values: [accountId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (accountNumber, accountName, accountType, accountInstitution, userId) => {
    const query = {
      text: `
        INSERT INTO accounts(number, name, type, institution, user_id) 
        VALUES($1, $2, $3, $4, $5)
        RETURNING account_id, number, name, type, institution, user_id;
      `,
      values: [accountNumber, accountName, accountType, accountInstitution, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (accountId, accountNumber, accountName, accountType, accountInstitution, userId) => {
    const query = {
      text: `
        UPDATE accounts 
        SET
          number = $1, 
          name = $2,
          type = $3,
          institution = $4
        WHERE account_id = $5 and user_id = $6
        RETURNING account_id, number, name, type, institution, user_id;
      `,
      values: [accountNumber, accountName, accountType, accountInstitution, accountId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (accountId, userId) => {
    const query = {
      text: `
        DELETE FROM accounts
        WHERE account_id = $1 AND user_id = $2 
        RETURNING account_id, number, name, type, institution, user_id;
      `,
      values: [accountId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default AccountModel;
