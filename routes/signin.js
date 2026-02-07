const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/signIn"));
});

router.post("/", (req, res) => {
  console.log("POST /signin called", req.body);

  const { user_name, password, email } = req.body;

  if (!user_name || !password || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const checkQuery = "SELECT * FROM users WHERE user_name = ? OR email = ?";
  const insertQuery =
    "INSERT INTO users (user_name, password, email) VALUES (?, ?, ?)";

  db.query(checkQuery, [user_name, email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0)
      return res.status(409).json({ message: "User Already Exists" });

    db.query(insertQuery, [user_name, password, email], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      return res.json({ message: "User added!" });
    });
  });
});

module.exports = router;
