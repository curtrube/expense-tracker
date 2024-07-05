import bcrypt from 'bcrypt';

import userService from '../services/userService.js';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (!users) {
      res.status(404).json({ message: 'no users found' });
    } else {
      res.status(200).json({ users: users });
    }
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: 'no users found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const getUser = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    console.error('missing username in req parameters');
  }
  try {
    const user = await userService.getUser(username);
    if (!user) {
      console.error(`user not found: ${username}`);
      return res.status(404).json({ message: `user not found: ${username}` });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.error(`Error in userController getUser(): ${err}`);
  }
};

const createUser = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  try {
    const dbUser = await userService.getUser(username);

    if (dbUser && dbUser.username === username) {
      return res.status(400).json({
        message: 'username already exists',
      });
    }
  } catch (err) {
    console.error(`checking if user exists user: ${username} error: ${err.message}`);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, firstName, lastName, password: hashedPassword };
    const user = await userService.createUser(userData);
    if (!user) {
      console.error(`unable to create new user: ${username}`);
    } else {
      console.log(`successfully created user: ${user.username}`);
      return res.status(200).json({ message: `user ${user.username} created successfully` });
    }
  } catch (err) {
    console.error(`Unable to create new user: ${username} error: ${err}`);
  }
};

// Delete user violates foreign key constraint on Transactions table.
const deleteUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'missing username in request' });
  }
  try {
    const dbUser = await userService.getUser(username);
    if (!dbUser) {
      console.error(`unable to delete user: ${username} not found`);
      return res.status(400).json({ message: 'user not found' });
    }
    const deletedUser = await userService.deleteUser(username);
    if (!deletedUser) {
      console.error(`unable to delete user: ${username}`);
    }
    return res.status(200).json({ message: `user ${deletedUser.username} deleted successfully` });
  } catch (err) {
    console.error(`unable to delete user: ${username} error: ${err}`);
  }
};

export default { getUsers, getUser, createUser, deleteUser };
