'use strict';

import bodyParser from 'body-parser';
import express from 'express';

import { categories } from './routes/categories.js';
import { accounts } from './routes/accounts.js'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(categories);
app.use(accounts)

app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
