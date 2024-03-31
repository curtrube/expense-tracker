import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ message: 'authentication required' });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'access denied' });
    req.user = user;
    next();
  });
};
