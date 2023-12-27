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
      res.status(200).json({ "categories": result.rows })
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

// Get category by id
app.get("/categories/:id", async (req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected')
    const categoryId = req.params.id;
    const query = `SELECT * FROM expense_tracker.categories WHERE category_id = ${categoryId};`;
    const result = await client.query(query)
    if (result.rowCount !== 0) {
      res.status(200).json({ "categories": result.rows })
    } else {
      res.json({ "categories": [] })
    }
  } catch (error) {
    console.error('Error querying categories by id:', error)
  } finally {
    await client.end();
    console.log('pg client disconnected')
  }
});

// Create category
app.post("/categories", async (req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected')
    // TODO: input needs to be sanitized
    // TODO: should we allow duplicate names?
    const categoryName = req.body.name;
    const query = `INSERT INTO expense_tracker.categories(name) VALUES('${categoryName}') RETURNING category_id, name;`;
    const result = await client.query(query)
    console.log(result)
    if (result.rowCount !== 0) {
      res.status(201).json(result.rows)
    } else {
      res.json({ "categories": [] })
    }
  } catch (error) {
    console.error('Error querying categories by id:', error)
  } finally {
    await client.end();
    console.log('pg client disconnected')
  }
});

// Bulk update categories

// Update the details of a category is id exists
// app.p;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
