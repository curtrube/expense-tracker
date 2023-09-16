const bodyParser = require("body-parser");
const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors({
	'origin': 'http://127.0.0.1:5500'
}));
app.use(bodyParser.json());

// GET, POST, PUT, DELET

// Get all categories
app.get("/categories", (req, res) => {
  const client = new pg.Client();
  client.connect((err) => {
    console.log("client has connected");
    const query = "SELECT * FROM categories;";
    client.query(query, (err, resp) => {
      console.log(err ? err.stack : resp.rows);
      res.send(resp.rows);
      client.end();
      console.log("client has been disconnected");
    });
  });
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
app.p;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
