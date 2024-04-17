import dbService from '../services/dbService.js';

class UserModel {
  findAll = async () => {
    const sql = 'SELECT user_id, username FROM users;';
    return await dbService.query(sql);
  };

  findOne = async (username) => {
    const query = {
      text: 'SELECT user_id, username, password FROM users WHERE username = $1;',
      values: [username],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length > 0) {
      return rows[0];
    }
  };

  create = async (username, password) => {
    const query = {
      text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING user_id, username;',
      values: [username, password],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length > 0) {
      return rows[0];
    }
  };

  delete = async (username) => {
    const query = {
      text: 'DELETE FROM users WHERE username = $1 RETURNING user_id, username;',
      values: [username],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length > 0) {
      return rows[0];
    }
  };
}

export default UserModel;
