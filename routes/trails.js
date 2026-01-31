const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const { requireLogin } = require("../middleware/autorization");

router.get("/", requireLogin, (req, res) => {
  const sql = "SELECT ID, NAME, LOCATION, RATING, LENGTH_KM FROM trails";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" });

    res.json(results);
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

router.put("/:id", requireLogin, (req, res) => {
  const { id } = req.params;
  const { NAME, LOCATION, RATING, LENGTH_KM } = req.body;

  if (![NAME, LOCATION, RATING, LENGTH_KM].every((v) => v?.toString().trim())) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(RATING) || RATING < 1 || RATING > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  if (isNaN(LENGTH_KM) || LENGTH_KM <= 0) {
    return res.status(400).json({ error: "Length must be a positive number" });
  }

  if (
    [NAME, LOCATION, RATING, LENGTH_KM].some(
      (prev) =>
        prev === undefined || prev === null || String(prev).trim() === "",
    )
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE trails
    SET NAME = ?, LOCATION = ?, RATING = ?, LENGTH_KM = ?
    WHERE ID = ?
  `;

  db.query(sql, [NAME, LOCATION, RATING, LENGTH_KM, id], (err, result) => {
    if (err) {
      console.error("Error updating trail:", err);
      return res.status(500).json({ error: "Database update failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Trail not found" });
    }

    res.json({ message: "Trail updated successfully" });
  });
});

module.exports = router;
