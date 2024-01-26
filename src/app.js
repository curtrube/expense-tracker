'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static('public'));

app.use(routes.categories);
app.use(routes.accounts);
app.use(routes.notFound);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
