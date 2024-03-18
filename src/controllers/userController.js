import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

// export const getUsers = async (req, res) => {
//   const userModel = new UserModel();
//   try {
//     const users = await userModel.findAll();
//     res.status(200).json({ users: users });
//   } catch (err) {
//     console.error('Error in userController getUsers()');
//     throw err;
//   }
// };

export const getUser = async (req, res) => {
  const userModel = new UserModel();
  const { username } = req.body;
  try {
    const user = await userModel.find(username);
    res.status(200).json({ users: user });
  } catch (err) {
    console.error(`Error in userController getUser(): ${err}`);
    throw err;
  }
};

export const createUser = async (req, res) => {
  const userModel = new UserModel();
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = { username: username, password: hashedPassword };
    const results = await userModel.create(username, hashedPassword);
    if (results.length > 0) {
      res.status(201).json({ message: 'successfully created user' });
    } else {
      res.status(200).json({ message: 'no user created' });
    }
  } catch (err) {
    console.error(`Error in the userController:  ${err}`);
    throw err;
  }
};
