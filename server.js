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

// Get subcategories by category_id
app.get("/api/subcategories/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  db.all(
    "SELECT * FROM sub_category WHERE cat_id = ?",
    [categoryId],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

// Get duas by subcategory_id
app.get("/api/duas/:subCategoryId", (req, res) => {
  const { subCategoryId } = req.params;
  db.all(
    "SELECT * FROM dua WHERE subcat_id = ?",
    [subCategoryId],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
