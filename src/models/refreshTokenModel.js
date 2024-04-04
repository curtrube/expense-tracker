import dbService from '../services/dbService.js';

class RefreshTokenModel {
  findOne = async (refreshToken) => {
    const sql = `SELECT refresh_token, user_id FROM refresh_tokens WEHRE refresh_token = ${refreshToken};`;
    return await dbService.query(sql);
  };
}

export default RefreshTokenModel;
