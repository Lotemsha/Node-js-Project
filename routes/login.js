const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const { redirectIfLoggedIn } = require("../middleware/autorization");

router.post("/", (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing user_name or password",
    });
  }

  db.query(
    "SELECT * FROM users WHERE user_name = ?",
    [user_name],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (rows.length === 0 || rows[0].password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid user or password",
        });
      }

      req.session.user = {
        id: rows[0].id,
        user_name: rows[0].user_name,
      };

      res.json({ success: true });
    },
  );
});

router.get("/", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/login.html"));
});

module.exports = router;
