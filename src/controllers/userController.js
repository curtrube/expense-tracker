import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  const userModel = new UserModel();
  try {
    const users = await userModel.findAll();
    res.status(200).json({ users: users });
  } catch (err) {
    console.error('Error in userController getUsers()');
    throw err;
  }
};

export const getUser = async (req, res) => {
  if (req.params && req.params.username) {
    const { username } = req.params;
    const userModel = new UserModel();
    try {
      const user = await userModel.findOne(username);
      if (!user) {
        return res.status(400).json({ message: 'user not found' });
      }
      res.status(200).json({ users: user });
    } catch (err) {
      console.error(`Error in userController getUser(): ${err}`);
      throw err;
    }
  } else {
    return res.status(400).json({ message: 'missing username in req.body' });
  }
};

export const createUser = async (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    const { username, password } = req.body;
    const userModel = new UserModel();

    try {
      const dbUser = await userModel.findOne(username);
      if (dbUser && dbUser.username === username) {
        return res.status(400).json({
          message: 'user already exists',
          location: 'userController.createUser',
        });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: err.message, location: 'userController createUser' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create(username, hashedPassword);
      res
        .status(200)
        .json({ message: `user ${result.username} created successfully` });
    } catch (err) {
      console.error(`Error in the userController:  ${err}`);
      throw err;
    }
  } else {
    return res.status(400).json({
      message: 'missing username or password',
      location: 'userController.createUser',
    });
  }
};

export const deleteUser = async (req, res) => {
  if (req.body && req.body.username) {
    const { username } = req.body;
    try {
      const userModel = new UserModel();
      const dbUser = await userModel.findOne(username);

      if (!dbUser) {
        return res.status(400).json({ message: 'error user not found' });
      }

      const result = await userModel.delete(username);
      res
        .status(200)
        .json({ message: `user ${result.username} deleted successfully` });
    } catch (err) {
      return res
        .status(400)
        .json({ message: err.message, location: 'userController.deleteUser' });
    }
  } else {
    return res.status(400).json({ message: 'no user in req.body' });
  }
};
