'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.use(routes.categories);
app.use(routes.accounts);
app.use(routes.transactions);
app.use(routes.notFound);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
