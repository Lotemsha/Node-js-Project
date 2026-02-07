const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const { requireLogin } = require("../middleware/autorization");

// /add
router.get("/", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/add.html"));
});

// add/id
router.get("/:id", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/add.html"));
});

// הוספה
router.post("/", requireLogin, (req, res) => {
  const { NAME, LOCATION, RATING, LENGTH_KM } = req.body;
  if (!NAME || !LOCATION || !RATING || !LENGTH_KM)
    return res.status(400).json({ message: "Missing fields" });

  // בדיקה אם כבר קיים
  const checkQuery = "SELECT * FROM trails WHERE name = ? AND location = ?";
  db.query(checkQuery, [NAME, LOCATION], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length > 0)
      return res.status(409).json({ message: "Trail Already Exists" });
    const insertQuery = `INSERT INTO trails (name, location, rating, length_km) VALUES (?, ?, ?, ?)`;
    db.query(
      insertQuery,
      [NAME, LOCATION, RATING, LENGTH_KM],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        return res.json({ message: "Trail added!" });
      },
    );
  });
});

// עריכה
router.put("/:id", requireLogin, (req, res) => {
  const { id } = req.params;
  const { NAME, LOCATION, RATING, LENGTH_KM } = req.body;

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
    WHERE id = ?
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
