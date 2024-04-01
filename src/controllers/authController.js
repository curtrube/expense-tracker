import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const userModel = new UserModel();
  const user = await userModel.find(username);
  console.log(user);

  if (user === null || user === undefined) {
    res.status(500).json({ message: 'no user provided' });
    return;
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      // TODO: bug I was running into when generating a new token
      // token payload was getting concatenated so I'm removing from the user object.
      delete user.refresh_token;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '4h',
      });
      // TODO: hash the refresh token, but how do we decode?
      // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      userModel.updateRefreshToken(user.username, refreshToken);

      const cookieOptions = {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      };
      res.status(200).cookie('refreshToken', refreshToken, cookieOptions).json({
        user: user.username,
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({ message: 'username and password does not match' });
    }
  } catch (err) {
    console.error(err);
  }
};

export const refresh = async (req, res) => {
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
    res.status(401).json({ message: 'you need to login' });
  } else if (refreshToken === refresh_token) {
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) res.sendStatus(403);
      // TODO: same as above, what's a better way to handle this?
      delete user.refresh_token;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      res.status(201).json({ accessToken: accessToken });
    });
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
