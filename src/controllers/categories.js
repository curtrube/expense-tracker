'use strict';

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
  const categoryId = req.params.id;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.findOne(categoryId);
    if (results.length !== 0) {
      res.status(200).json({ categories: results });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (req, res) => {
  // TODO: input needs to be sanitized
  // TODO: should we allow duplicate names? probably not
  const categoryName = req.body.name;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.create(categoryName);
    if (results.length !== 0) {
      res.status(201).json({ categories: results });
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const categoryName = req.body.name;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.update(categoryId, categoryName);
    if (results.length !== 0) {
      res.status(201).json({ categories: results });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const categoryModel = new CategoryModel();
  try {
    const results = await categoryModel.delete(categoryId);
    if (results.length !== 0) {
      res.status(202).json({ categories: results });
    }
  } catch (error) {
    console.error(error);
  }
};
