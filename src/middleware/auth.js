import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import RefreshTokenModel from '../models/refreshTokenModel.js';
import UserModel from '../models/userModel.js';

dotenv.config();

export const authenticate = async (req, res, next) => {
  const userModel = new UserModel();
  const refreshTokenModel = new RefreshTokenModel();
  let verifiedRefreshToken;
  let verifiedAccessToken;

  const { refreshToken } = req.cookies;

  // Check the refresh token is saved in the DB
  if (req.cookies && req.cookies.refreshToken) {
    try {
      const savedRefreshToken = await refreshTokenModel.findOne(refreshToken);
      if (!savedRefreshToken) {
        res.status(401).json({ message: 'no refresh token found in db' });
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: 'userModel.findRefreshToken()',
      });
    }
  } else {
    return res.status(401).json({ message: 'no refresh token in cookies' });
  }

  // Check refresh token is valid
  try {
    verifiedRefreshToken = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, location: 'jwt.verify refresh token' });
  }

  // Check access token is valid
  if (req.headers && req.headers.authorization) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      verifiedAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message, location: 'jwt.verify access token' });
    }
  } else {
    return res.status(401).json({ message: 'no access token in headers' });
  }

  // Do we need this?
  if (!verifiedAccessToken) {
    res.status(401).json({ message: 'access token c' });
  }

  // Compare the two profiles
  let refreshTokenUser;
  try {
    refreshTokenUser = await userModel.findOne(verifiedRefreshToken.username);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, location: 'user.find refresh token user' });
  }

  if (!refreshTokenUser) {
    return res
      .status(401)
      .json({ message: 'refresh token user not found in db' });
  }

  let accessTokenUser;
  try {
    accessTokenUser = await userModel.findOne(verifiedAccessToken.username);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, location: 'user.find access token user' });
  }

  if (!accessTokenUser) {
    return res
      .status(401)
      .json({ message: 'access token user not found in db' });
  }

  if (
    refreshTokenUser.username === accessTokenUser.username &&
    refreshTokenUser.password === accessTokenUser.password
  ) {
    res.status(200);
    res.username = accessTokenUser.username;
    req.user = accessTokenUser;
    return next();
  }

  return res
    .status(401)
    .json({ message: 'refresh token user and access token user do not match' });
};
