import CategoryModel from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.findAll();
    if (results.length !== 0) {
      res.status(200).json({ categories: results });
    } else {
      res.status(204).json({ categories: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.findOne(id);
    if (results.length !== 0) {
      res.status(200).json(results);
    }
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (req, res) => {
  // TODO: input needs to be sanitized
  // TODO: should we allow duplicate names? probably not
  const { name, description } = req.body;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.create(name, description);
    if (results.length !== 0) {
      res.status(201).json(results);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.update(id, name, description);
    if (results.length !== 0) {
      res.status(201).json(results);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.delete(id);
    if (results.length !== 0) {
      res.status(202).json(results);
    }
  } catch (error) {
    console.error(error);
  }
};
