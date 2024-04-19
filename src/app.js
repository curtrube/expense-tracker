import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// api routes
app.use('/api', routes);

// Middleware to handle not found routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: '404 Not Found' });
  next();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
