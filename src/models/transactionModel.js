import dbService from '../services/dbService.js';

class TransactionModel {
  findAll = async () => {
    const sql = `
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
        LEFT JOIN categories on (transactions.category_id = categories.category_id);
    `;
    return await dbService.query(sql);
  };

  findOne = async (transactionId) => {
    const sql = `
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
      WHERE transaction_id = ${transactionId};
    `;
    return await dbService.query(sql);
  };

  // TODO: sanitize inputs
  create = async (merchant, amount, date, userId, accountId, categoryId) => {
    const sql = `
      INSERT INTO transactions(merchant, amount, date, user_id, account_id, category_id)
      VALUES('${merchant}', '${amount}', '${date}', '${userId}', '${accountId}', '${categoryId}')
      RETURNING transaction_id, merchant, amount, date, user_id, account_id, category_id;
    `;
    return await dbService.query(sql);
  };

  update = async (
    transactionId,
    merchant,
    amount,
    date,
    userId,
    accountId,
    categoryId
  ) => {
    const sql = `
      UPDATE transactions
      SET
        merchant = '${merchant}',
        amount = '${amount}',
        date = '${date}',
        user_id = '${userId}',
        account_id = '${accountId}',
        category_id = '${categoryId}'
      WHERE transaction_id = ${transactionId}
      RETURNING transaction_id, merchant, amount, date, user_id, account_id, category_id;
    `;
    return await dbService.query(sql);
  };

  delete = async (transactionId) => {
    const sql = `
      DELETE FROM transactions
      WHERE transaction_id = ${transactionId}
      RETURNING transaction_id, merchant, amount, date, account_id, category_id;
    `;
    return await dbService.query(sql);
  };
}

export default TransactionModel;
