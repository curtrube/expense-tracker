import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import RefreshTokenModel from '../models/refreshTokenModel.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utilities/generateToken.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    res.status(500).json({ message: 'no username or password provided' });
    return;
  }

  const userModel = new UserModel();
  const user = await userModel.findOne(username);
  if (!user) {
    return res.status(404).json({ message: 'no user found in db' });
  }

  const refreshTokenModel = new RefreshTokenModel();

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokenModel.create(user.user_id, refreshToken);

      const refreshOptions = {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      };
      res
        .status(200)
        .cookie('refreshToken', refreshToken, refreshOptions)
        .json({
          username: user.username,
          accessToken: accessToken,
        });
    } else {
      res.status(401).json({ message: 'username and password does not match' });
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = async (req, res) => {
  const { username, refreshToken } = req.body;

  if (
    username === null ||
    username === undefined ||
    refreshToken === null ||
    refreshToken === undefined
  ) {
    res.sendStatus(400);
  }

  const userModel = new UserModel();
  const user = await userModel.find(username);
  const { refresh_token } = user;

  if (refresh_token === null || refresh_token === undefined) {
    res.status(401).json({ message: 'you need to login first' });
  } else if (refreshToken === refresh_token) {
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) res.sendStatus(403);
    });
    if (await userModel.deleteRefreshToken(username)) {
      res.sendStatus(204);
    }
  }
};

export const refreshToken = async (req, res) => {
  if (req.cookies && req.cookies.refreshToken) {
    const refreshTokenModel = new RefreshTokenModel();
    let savedRefreshToken;
    try {
      savedRefreshToken = await refreshTokenModel.findOne(
        req.cookies.refreshToken
      );
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: 'await refreshTokenModel.findOne',
      });
    }
    if (!savedRefreshToken) {
      res.status(401).json({ message: 'no refresh token found in the db' });
    }

    // If saved, send back a new access token
    let verifiedRefreshToken;
    try {
      verifiedRefreshToken = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: 'jwt.verify failed refresh token',
      });
    }

    try {
      const userModel = new UserModel();
      const user = await userModel.findOne(verifiedRefreshToken.username);
      const accessToken = generateAccessToken(user);
      return res.status(200).json({ accessToken });
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message, location: 'await userModel.findOne' });
    }
  }
  return res.status(401).json({ message: 'no refresh token in cookies' });
};
