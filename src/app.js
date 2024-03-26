import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import routes from './routes/index.js';
import { authenticateToken } from './middleware/authToken.js';

const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// const posts = [
//   {
//     user: 'curtis',
//     post: 'hello curtis these are your posts',
//   },
//   {
//     user: 'alex',
//     post: 'hello alexalex',
//   },
// ];

// app.get('/posts', authenticateToken, (req, res) => {
//   console.log(req);
//   res
//     .status(200)
//     .json({ post: posts.filter((post) => post.user === req.user.username) });
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token === null) {
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// api routes
// All api routes should be protected / private
app.use('/api', authenticateToken, routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
