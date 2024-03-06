import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import accountsRouter from './routes/accounts.js';
import categoriesRouter from './routes/categories.js';
import transactionsRouter from './routes/transactions.js';

const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static('public'));

// api routes
app.use(accountsRouter);
app.use(categoriesRouter);
app.use(transactionsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
