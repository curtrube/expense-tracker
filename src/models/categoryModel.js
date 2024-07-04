import dbService from '../services/dbService.js';

class CategoryModel {
  findAll = async (userId) => {
    const query = {
      text: `
        SELECT category_id, name, description, user_id 
        FROM categories 
        WHERE user_id = $1;
    `,
      values: [userId],
    };
    return await dbService.query(query);
  };

  findOne = async (categoryId, userId) => {
    const query = {
      text: `
        SELECT category_id, name, description, user_id 
        FROM categories 
        WHERE category_id = $1 AND user_id = $2;
    `,
      values: [categoryId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (name, description, userId) => {
    const query = {
      text: `
        INSERT INTO categories(name, description, user_id)
        VALUES($1, $2, $3)
        RETURNING category_id, name, description, user_id;
      `,
      values: [name, description, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (categoryId, name, description, userId) => {
    const query = {
      text: `
        UPDATE categories
        SET
          name = $1,
          description = $2 
        WHERE category_id = $3 AND user_id = $4 
        RETURNING category_id, name, description, user_id;
      `,
      values: [name, description, categoryId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (categoryId, userId) => {
    const query = {
      text: `
        DELETE FROM categories
        WHERE category_id = $1 AND user_id = $2
        RETURNING category_id, name, description, user_id;
      `,
      values: [categoryId, userId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default CategoryModel;
