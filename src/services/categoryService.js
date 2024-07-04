import CategoryModel from '../models/categoryModel.js';

const getCategories = async (userId) => {
  const categoryModel = new CategoryModel();
  try {
    const dbCategories = await categoryModel.findAll(userId);
    if (!dbCategories) {
      const error = new Error('No categories found');
      error.status(404);
      throw error;
    } else {
      const categories = dbCategories.map((category) => {
        const { category_id, user_id, ...rest } = category;
        return { categoryId: category_id, ...rest, userId: user_id };
      });
      return categories;
    }
  } catch (err) {
    console.error(`getting all categories: ${err.message}`);
  }
};

const getCategory = async (categoryId, userId) => {
  const categoryModel = new CategoryModel();
  try {
    const dbCategory = await categoryModel.findOne(categoryId, userId);
    if (!dbCategory) {
      const error = new Error('No category found');
      error.status(404);
      throw error;
    } else {
      const { category_id, user_id, ...rest } = dbCategory;
      return { categoryId: category_id, ...rest, userId: user_id };
    }
  } catch (err) {
    console.error(`getting one category: ${err.message}`);
  }
};

const createCategory = async (categoryData) => {
  const requiredProps = ['name', 'description', 'userId'];
  for (const prop of requiredProps) {
    if (!Object.prototype.hasOwnProperty.call(categoryData, prop)) {
      const error = new Error(`Category data missing prop: ${prop}`);
      error.status = 400;
      throw error;
    }
  }
  const { name, description, userId } = categoryData;
  const categoryModel = new CategoryModel();
  try {
    return await categoryModel.create(name, description, userId);
  } catch (err) {
    console.error(`creating new category: ${err.message}`);
  }
};

const updateCategory = async (categoryData) => {
  const requiredProps = ['categoryId', 'name', 'description', 'userId'];
  for (const prop of requiredProps) {
    if (!Object.prototype.hasOwnProperty.call(categoryData, prop)) {
      const error = new Error(`Category data missing prop: ${prop}`);
      error.status = 400;
      throw error;
    }
  }
  const { categoryId, name, description, userId } = categoryData;
  const categoryModel = new CategoryModel();
  try {
    return await categoryModel.update(categoryId, name, description, userId);
  } catch (err) {
    console.error(`updating category: ${err.message}`);
  }
};

const deleteCategory = async (categoryId, userId) => {
  if (!categoryId || !userId) {
    throw new Error('Missing required parameters categoryId or userId');
  }
  const categoryModel = new CategoryModel();
  try {
    return await categoryModel.delete(categoryId, userId);
  } catch (err) {
    console.error(`deleting category: ${err.message}`);
  }
};

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
