const express = require("express");
const pg = require("pg");
const app = express();
const port = 3000;

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
        res.send(`No values matching id: ${req.params.id}`);
      }
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
