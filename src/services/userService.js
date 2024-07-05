import UserModel from '../models/userModel.js';

const getUsers = async () => {
  const userModel = new UserModel();
  try {
    const dbUsers = await userModel.findAll();
    if (!dbUsers) {
      const error = new Error('No users found');
      error.status = 404;
      throw error;
    }
    const users = dbUsers.map((user) => {
      const { user_id, first_name, last_name, ...rest } = user;
      return { userId: user_id, firstName: first_name, lastName: last_name, ...rest };
    });
    return users;
  } catch (err) {
    console.error(`retrieving users: ${err.message}`);
  }
};

const getUser = async (username) => {
  if (!username) {
    throw new Error('userId required');
  }
  const userModel = new UserModel();
  try {
    const dbUser = await userModel.findOne(username);
    if (!dbUser) {
      console.log(`user not found: ${username}`);
      const error = new Error(`user not found with username: ${username}`);
      error.status = 404;
      throw error;
    }
    const { user_id, first_name, last_name, ...rest } = dbUser;
    return { userId: user_id, firstName: first_name, lastName: last_name, ...rest };
  } catch (err) {
    console.error(`retrieving user: ${err.message}`);
  }
};

const createUser = async (userData) => {
  const requiredProps = ['username', 'firstName', 'lastName', 'password'];
  for (const prop of requiredProps) {
    if (!Object.prototype.hasOwnProperty.call(userData, prop)) {
      console.error(`user data missing prop ${prop}`);
      const error = new Error(`user data missing prop: ${prop}`);
      error.status = 400;
      throw error;
    }
  }
  const userModel = new UserModel();
  try {
    const { username, firstName, lastName, password } = userData;
    return userModel.create(username, firstName, lastName, password);
  } catch (err) {
    console.error(`creating user: ${err.message}`);
  }
};

// TODO: implement this in the model
// const updateUser = async (userData) => {};

const deleteUser = async (username) => {
  if (!username) {
    throw new Error('cannot delete user missing username');
  }
  const userModel = new UserModel();
  try {
    return await userModel.delete(username);
  } catch (err) {
    console.error(`deleting user: ${err.message}`);
  }
};

export default { getUsers, getUser, createUser, deleteUser };
