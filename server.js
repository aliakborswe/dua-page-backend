const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database("./dua_main.sqlite", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite database.");
});

// Get all categories
app.get("/api/categories", (req, res) => {
  db.all("SELECT * FROM category", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
