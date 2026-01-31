const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/signIn"));
});

function validateEmail(email) {
  // Method to validate email (פונקצייה מיובאת)
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

router.post("/", (req, res) => {
  console.log("POST /signin called", req.body);

  const { user_name, password, email } = req.body;
  console.log(validateEmail(email));

  if (!user_name || !password || !email) {
    return res.status(400).json({ message: "Missing fields" });
    console.log(validateEmail(email));
  }

  if (!validateEmail(email)) {
    return res.status(422).json({ message: "Unvalid email" });
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
