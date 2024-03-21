import dbService from '../services/dbService.js';

class CategoryModel {
  findAll = async () => {
    const sql = 'SELECT * FROM categories;';
    return await dbService.query(sql);
  };

  findOne = async (categoryId) => {
    const sql = `
      SELECT *
      FROM categories 
      WHERE category_id = ${categoryId};
    `;
    return await dbService.query(sql);
  };

  create = async (name, description) => {
    const sql = `
      INSERT INTO categories(name, description)
      VALUES('${name}', '${description}')
      RETURNING category_id, name;
    `;
    return await dbService.query(sql);
  };

  update = async (categoryId, name, description) => {
    const sql = `
      UPDATE categories
      SET
        name = '${name}',
        description = '${description}'
      WHERE category_id = '${categoryId}'
      RETURNING category_id, name, description;
    `;
    return await dbService.query(sql);
  };

  delete = async (categoryId) => {
    const sql = `
      DELETE FROM categories
      WHERE category_id = '${categoryId}'
      RETURNING category_id, name;
    `;
    return await dbService.query(sql);
  };
}

export default CategoryModel;
