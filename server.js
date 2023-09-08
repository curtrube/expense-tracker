const express = require("express");
const app = express();
const port = 3000;

const pg = require("pg");

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
      res.send(resp.rows[0]);
      client.end();
    });
  });
});

app.post("/categories", (req, res) => {
  res.send("Hello from categories POST");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
