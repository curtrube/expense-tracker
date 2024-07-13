import dbService from '../services/dbService.js';

class TransactionModel {
  findAll = async (userId) => {
    const query = {
      text: `
        SELECT 
          transaction_id, 
          date, 
          merchant,
          amount,
          users.username as username,
          accounts.name as account,
          categories.name as category
        FROM transactions
        LEFT JOIN users on (transactions.user_id = users.user_id)
        LEFT JOIN accounts on (transactions.account_id = accounts.account_id)
        LEFT JOIN categories on (transactions.category_id = categories.category_id)
        WHERE transactions.user_id = $1;
      `,
      values: [userId],
    };
    return await dbService.query(query);
  };

  findOne = async (transactionId, userId) => {
    const query = {
      text: `
        SELECT 
          transaction_id, 
          date, 
          merchant,
          amount,
          users.username as username,
          accounts.name as account,
          categories.name as category
        FROM transactions
        LEFT JOIN users on (transactions.user_id = users.user_id)
        LEFT JOIN accounts on (transactions.account_id = accounts.account_id)
        LEFT JOIN categories on (transactions.category_id = categories.category_id)
        WHERE transaction_id = $1 AND transactions.user_id = $2;
      `,
      values: [transactionId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (merchant, amount, date, userId, accountId, categoryId) => {
    const query = {
      text: `
        INSERT INTO transactions(
          merchant,
          amount,
          date,
          user_id,
          account_id,
          category_id
        )
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING 
          transaction_id,
          merchant,
          amount,
          date,
          user_id,
          account_id,
          category_id;
      `,
      values: [merchant, amount, date, userId, accountId, categoryId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (transactionId, merchant, amount, date, userId, accountId, categoryId) => {
    const query = {
      text: `
        UPDATE transactions
        SET
          merchant = $1,
          amount = $2,
          date = $3,
          user_id = $4,
          account_id = $5,
          category_id = $6 
        WHERE transaction_id = $7 AND user_id = $4
        RETURNING
          transaction_id,
          merchant,
          amount,
          date,
          user_id,
          account_id,
          category_id;
      `,
      values: [merchant, amount, date, userId, accountId, categoryId, transactionId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (transactionId, userId) => {
    const query = {
      text: `
        DELETE FROM transactions
        WHERE transaction_id = $1 AND user_id = $2
        RETURNING
          transaction_id,
          merchant,
          amount,
          date,
          account_id,
          category_id;
      `,
      values: [transactionId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default TransactionModel;
