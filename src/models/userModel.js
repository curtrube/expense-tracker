import dbService from '../services/dbService.js';

class UserModel {
  findAll = async () => {
    const sql = 'SELECT user_id, username, first_name, last_name FROM users;';
    return await dbService.query(sql);
  };

  findOne = async (username) => {
    const query = {
      text: `
        SELECT user_id, username, first_name, last_name, password
        FROM users
        WHERE username = $1;
      `,
      values: [username],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (username, firstName, lastName, password) => {
    // TODO: make firstName & lastName optional also change username to email address??
    const query = {
      text: `
        INSERT INTO users(username, first_name, last_name, password)
        VALUES($1, $2, $3, $4)
        RETURNING user_id, username;
      `,
      values: [username, firstName, lastName, password],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (username) => {
    const query = {
      text: `
        DELETE FROM users 
        WHERE username = $1
        RETURNING user_id, username;
      `,
      values: [username],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default UserModel;
