import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import authRouter from './routes/auth.js';
import accountsRouter from './routes/accounts.js';
import categoriesRouter from './routes/categories.js';
import transactionsRouter from './routes/transactions.js';
import usersRouter from './routes/users.js';
import errorRouter from './routes/error.js';
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

const posts = [
  {
    user: 'curtis',
    post: 'hello curtis these are your posts',
  },
  {
    user: 'alex',
    post: 'hello alexalex',
  },
];

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
app.use(authRouter);
app.use(accountsRouter);
app.use(categoriesRouter);
app.use(transactionsRouter);
app.use(usersRouter);
app.use(errorRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
