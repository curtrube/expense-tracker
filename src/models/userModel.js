import dbService from '../services/dbService.js';

class UserModel {
  findAll = async () => {
    const sql = 'SELECT user_id, username FROM users;';
    return await dbService.query(sql);
  };

  find = async (username) => {
    const sql = `
        SELECT user_id, username 
        FROM users 
        WHERE username = '${username}';
    `;
    return await dbService.query(sql);
  };

  create = async (username, password) => {
    const sql = `
        INSERT INTO users(username, password)
        VALUES('${username}', '${password}')
        RETURNING username;`;
    return await dbService.query(sql);
  };

  delete = async (username) => {
    const sql = `
        DELETE FROM users 
        WHERE username = ${username} 
        RETURNING username;`;
    return await dbService.query(sql);
  };
}

export default UserModel;
