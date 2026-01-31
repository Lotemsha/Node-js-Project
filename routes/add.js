const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const { requireLogin } = require("../middleware/autorization");

router.get("/", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/add.html"));
});

router.post("/", (req, res) => {
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

module.exports = router;
