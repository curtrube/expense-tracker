'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET, POST, PUT, DELET

app.get("/", (req, res) => {
  res.send("<h1>Expense Tracker</h1>")
})

// Get all categories
app.get("/categories", async (req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected')
    const query = 'SELECT * FROM expense_tracker.categories;'
    const result = await client.query(query)
    if (result.rowCount !== 0) {
      res.json({ "categories": result.rows })
    } else {
      res.json({ "categories": [] })
    }
  } catch (error) {
    console.error('Error querying categories:', error)
  } finally {
    await client.end();
    console.log('pg client disconnected')
  }
});

// Get category by Id
app.get("/categories/:id", (req, res) => {
  const client = new pg.Client();
  client.connect((err) => {
    const query = `SELECT * FROM categories WHERE category_id = ${req.params.id}`;
    client.query(query, (err, resp) => {
      console.log(err ? err.stack : resp.rows[0]);
      if (resp.rows[0] != undefined) {
        res.send(resp.rows[0]);
      } else {
        res.send(`No values matching id: ${req.params.id}`); // TODO: return this as JSON
      }
      client.end();
    });
  });
});

// Create a new category
// TODO: only allow JSON
// sanitize inputs
app.post("/categories", (req, res) => {
  const client = new pg.Client();
  client.connect((err) => {
    const value = req.body.name;
    console.log(value);
    const query = `INSERT INTO categories(name) VALUES('${value}')`;
    console.log(query);
    client.query(query, (err, resp) => {
      console.log(err ? err.stack : resp);
    });
  });
});

// Bulk update categories

// Update the details of a category is id exists
// app.p;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
