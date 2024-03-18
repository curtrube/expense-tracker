import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

export const login = async (req, res) => {
  const { username } = req.body;
  const userModel = new UserModel();

  const user = userModel.find((u) => u.username === username);

  if (user === null) {
    res.status(500).json({ message: 'user not found' });
  }
  try {
    console.log(req.headers);
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
      });
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(401).json({ message: 'username and password does not match' });
    }
  } catch (err) {
    console.error(err);
  }
};
