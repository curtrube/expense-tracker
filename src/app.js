'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Expense Tracker</h1>")
})

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

app.post("/categories", async (req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected')
    // TODO: input needs to be sanitized
    // TODO: should we allow duplicate names? probably not
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

app.put("/categories/:id", async(req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected');
    const categoryId = req.params.id;
    const categoryName = req.body.name;
    const query = `UPDATE expense_tracker.categories SET name = '${categoryName}' WHERE category_id = '${categoryId}' RETURNING category_id, name;`
    const result = await client.query(query)
    if (result.rowCount !== 0) {
      res.status(201).json(result.rows)
    } else {
      res.json({ "categories": [] })
    }
  }
  catch (error) {
    console.errror("Error updating category id:", error)
  }
  finally {
    await client.end();
    console.log('pg client disconnected')
  }
});

app.delete("/categories/:id", async(req, res) => {
  const client = new pg.Client({
    database: "expense_tracker"
  });
  try {
    await client.connect();
    console.log('pg client connected')
    const categoryId = req.params.id;
    const query = `DELETE FROM expense_tracker.categories WHERE category_id = '${categoryId}' RETURNING category_id, name;`
    const result = await client.query(query)
    if (result.rowCount !== 0) {
      res.status(200).json(result.rows)
    } else {
      res.json({ "categories": [] })
    }
  }
  catch (error) {
    console.errror("Error updating category id:", error)
  }
  finally {
    await client.end();
    console.log('pg client disconnected')
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
