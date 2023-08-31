const express = require("express");
const app = express();
const port = 3000;

// GET, POST, PUT, DELETE

const categories = [
  {
    category_id: 12345,
    name: "food",
  },
  {
    category_id: 67890,
    name: "automotive",
  },
];

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
