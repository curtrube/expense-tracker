import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import accountsRouter from './routes/accounts.js';
import categoriesRouter from './routes/categories.js';
import transactionsRouter from './routes/transactions.js';
import errorRouter from './routes/error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static('public'));

const users = [];

const posts = [
  {
    user: 'curtis',
    post: 'hello curtis',
  },
  {
    user: 'alex',
    post: 'hello alexalex',
  },
];

app.post('/user', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username: username, password: hashedPassword };
    users.push(user);
    res
      .status(201)
      .send(`${user.username} created with password ${user.password}`);
  } catch (err) {
    console.error(err);
  }
});

app.post('/login', async (req, res) => {
  const user = users.find((u) => u.username === req.body.username);
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
});

app.get('/posts', authenticateToken, (req, res) => {
  console.log(req);
  res
    .status(200)
    .json({ post: posts.filter((post) => post.user === req.user.username) });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// api routes
app.use(accountsRouter);
app.use(categoriesRouter);
app.use(transactionsRouter);
app.use(errorRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
