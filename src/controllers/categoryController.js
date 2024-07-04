import categoryService from '../services/categoryService.js';

const getCategories = async (req, res) => {
  const userId = req.user?.user_id;
  if (!userId) {
    res.status(400).json({ message: 'missing userId in request' });
  }
  try {
    const categories = await categoryService.getCategories(userId);
    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
    } else {
      res.status(200).json({ categories: categories });
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'No categories found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params?.id;
  const userId = req.user?.user_id;
  if (!categoryId || !userId) {
    res.status(400).json({ message: 'missing categoryId or userId in request' });
  }
  try {
    const category = await categoryService.getCategory(categoryId, userId);
    if (!category) {
      res.status(404).json({ message: `No category with Id ${categoryId} found` });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: `No category with Id ${categoryId} found` });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const createCategory = async (req, res) => {
  const categoryData = { ...req.body, userId: req.user?.user_id };
  try {
    const newCategory = await categoryService.createCategory(categoryData);
    if (!newCategory) {
      res.status(404).json({ message: 'Unable to new category' });
    } else {
      res.status(201).json(newCategory);
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'Unable to new category' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
      console.log(err);
    }
  }
};

const updateCategory = async (req, res) => {
  const categoryData = { categoryId: req.params?.id, ...req.body, userId: req.user?.user_id };
  try {
    const updatedCategory = await categoryService.updateCategory(categoryData);
    if (!updateCategory) {
      res.status(204).json({ message: 'Unable to update category' });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'Unable to update category' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params?.id;
  const userId = req.user?.user_id;
  if (!categoryId || !userId) {
    res.status(400).json({ message: 'missing required categoryId or user in request' });
  }
  try {
    const deletedCategory = await categoryService.deleteCategory(categoryId, userId);
    if (!deletedCategory) {
      res.status(400).json({ message: 'Unable to delete category' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'Unable to delete category' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
