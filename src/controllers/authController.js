import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const userModel = new UserModel();

  const users = await userModel.find(username);
  const user = users.find((u) => u.username === username);

  if (user === null || user === undefined) {
    res.status(500).json({ message: 'user not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m',
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '4h',
      });
      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
      // store the refresh token in the database for that user
    } else {
      res.status(401).json({ message: 'username and password does not match' });
    }
  } catch (err) {
    console.error(err);
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  // check if refresh token is null
  // check if the refresh token exists in the database
  //   jwt.verify() method on the refresh token
  //   generate a new accessToken e.g. write a generateAccessToken() function
  //   send the new accessToken to the client
};

// TODO: Create a logout function
// app.delete('/logout')
// send the refresh token in the request body
// delete the refresh token from the database
