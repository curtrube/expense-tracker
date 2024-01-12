'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';
import { categories } from './routes/categories.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(categories);

app.get("/", (req, res) => {
  res.send("<h1>Expense Tracker</h1>")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
