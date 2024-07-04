import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import RefreshTokenModel from '../models/refreshTokenModel.js';
import UserModel from '../models/userModel.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utilities/generateToken.js';
import parseDuration from '../utilities/parseDuration.js';

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
        maxAge: parseDuration(process.env.REFRESH_TOKEN_EXPIRY),
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
  const refreshToken = req.cookies?.refreshToken;

  let savedRefreshToken;
  if (refreshToken) {
    const refreshTokenModel = new RefreshTokenModel();
    try {
      savedRefreshToken = await refreshTokenModel.findOne(refreshToken);
      if (!savedRefreshToken) {
        return res
          .status(400)
          .json({ message: 'no refresh token found in db' });
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: 'refreshTokenModel.findOne in authController logout',
      });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'no refresh token found in cookies' });
  }

  let verifiedRefreshToken;
  try {
    verifiedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verifiedRefreshToken) {
      return res.status(400).json({ message: 'invalid refresh token' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  const refreshTokenModel = new RefreshTokenModel();
  try {
    const userId = verifiedRefreshToken?.user_id;
    const deletedRefreshToken = await refreshTokenModel.delete(userId);
    if (deletedRefreshToken) {
      res.clearCookie('refreshToken').status(200).json('log out successful');
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'error deleting refresh token from db' });
  }
};

export const refresh = async (req, res) => {
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
      return res
        .status(200)
        .json({ username: user.username, accessToken: accessToken });
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message, location: 'await userModel.findOne' });
    }
  }
  return res.status(401).json({ message: 'no refresh token in cookies' });
};
