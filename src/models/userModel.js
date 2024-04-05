import dbService from '../services/dbService.js';

class UserModel {
  findAll = async () => {
    const sql = 'SELECT user_id, username FROM users;';
    return await dbService.query(sql);
  };

  findOne = async (username) => {
    const sql = `
      SELECT user_id, username, password
      FROM users 
      WHERE username = '${username}';
    `;
    const rows = await dbService.query(sql);
    if (rows != undefined) {
      if (rows.length > 0) {
        return rows[0];
      }
    }
  };

  create = async (username, password) => {
    const sql = `
      INSERT INTO users(username, password)
      VALUES('${username}', '${password}')
      RETURNING username;
    `;
    return await dbService.query(sql);
  };

  delete = async (username) => {
    const sql = `
      DELETE FROM users 
      WHERE username = ${username} 
      RETURNING username;
    `;
    return await dbService.query(sql);
  };
}

export default UserModel;
