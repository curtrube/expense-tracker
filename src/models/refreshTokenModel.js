import dbService from '../services/dbService.js';

class RefreshTokenModel {
  findOne = async (refreshToken) => {
    const sql = `
      SELECT refresh_token, user_id
      FROM refresh_tokens
      WHERE refresh_token = '${refreshToken}';
    `;
    return await dbService.query(sql);
  };

  create = async (userId, refreshToken) => {
    const sql = `
      INSERT INTO refresh_tokens(user_id, refresh_token)
      VALUES('${userId}', '${refreshToken}');
    `;
    return await dbService.query(sql);
  };

  update = async (userId, refreshToken) => {
    const sql = `
      UPDATE refresh_tokens
      SET refresh_token = '${refreshToken}'
      WHERE user_id = '${userId}'
      RETURNING user_id, refresh_token;
    `;
    return await dbService.query(sql);
  };
}

export default RefreshTokenModel;
