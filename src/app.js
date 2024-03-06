import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import { corsOptions } from './configs/corsOptions.js';
import { logger } from './middleware/logEvents.js';

const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static('public'));

app.use(routes.categories);
app.use(routes.accounts);
app.use(routes.transactions);
app.use(routes.notFound);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
