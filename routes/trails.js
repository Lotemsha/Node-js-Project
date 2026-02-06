const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const { requireLogin } = require("../middleware/autorization");

// trails/
router.get("/", requireLogin, (req, res) => {
  const sql = "SELECT ID, NAME, LOCATION, RATING, LENGTH_KM FROM trails";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" });

    res.json(results);
  });
});

// traild/id
router.get("/:id", requireLogin, (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM trails WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    res.json(rows[0]);
  });
});

// Delete
router.delete("/:id", requireLogin, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM trails WHERE id = ?";
  console.log("Deleting trail with ID:", id);
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Server error" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Trail not found" });

    res.json({ message: "Trail deleted successfully" });
  });
});

module.exports = router;
