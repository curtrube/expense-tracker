import dbService from '../services/dbService.js';

class CategoryModel {
  findAll = async () => {
    const sql = 'SELECT * FROM categories;';
    return await dbService.query(sql);
  };

  findOne = async (categoryId) => {
    const query = {
      text: 'SELECT * FROM categories WHERE category_id = $1;',
      values: [categoryId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  create = async (name, description) => {
    const query = {
      text: `
        INSERT INTO categories(name, description)
        VALUES($1, $2)
        RETURNING category_id, name, description;
      `,
      values: [name, description],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  update = async (categoryId, name, description) => {
    const query = {
      text: `
        UPDATE categories
        SET
          name = $1,
          description = $2 
        WHERE category_id = $3 
        RETURNING category_id, name, description;
      `,
      values: [name, description, categoryId],
    };
    const rows = await dbService.query(query);
    console.log(rows);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };

  delete = async (categoryId) => {
    const query = {
      text: `
        DELETE FROM categories
        WHERE category_id = $1 
        RETURNING category_id, name;
      `,
      values: [categoryId],
    };
    const rows = await dbService.query(query);
    if (rows && rows.length === 1) {
      return rows[0];
    }
  };
}

export default CategoryModel;
