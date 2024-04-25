import dbService from '../services/dbService.js';

class RefreshTokenModel {
  findOne = async (refreshToken) => {
    const query = {
      text: `
        SELECT refresh_token, user_id
        FROM refresh_tokens
        WHERE refresh_token = $1;
      `,
      values: [refreshToken],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (userId, refreshToken) => {
    const query = {
      text: `
        INSERT INTO refresh_tokens(user_id, refresh_token)
        VALUES($1, $2)
        RETURNING user_id;
      `,
      values: [userId, refreshToken],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (userId, refreshToken) => {
    const query = {
      text: `
        UPDATE refresh_tokens
        SET refresh_token = $1 
        WHERE user_id = $2 
        RETURNING user_id, refresh_token;
      `,
      values: [userId, refreshToken],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (userId) => {
    const query = {
      text: `
        DELETE from refresh_tokens
        WHERE user_id = $1
        RETURNING user_id;
      `,
      values: [userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default RefreshTokenModel;
