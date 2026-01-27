const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const { requireLogin } = require("../middleware/autorization");

router.get("/", requireLogin, (req, res) => {
  console.log("Session in home:", req.session);
  res.sendFile(path.join(__dirname, "../FE/home.html"));
});

router.get("/trails", (req, res) => {
  db.query("SELECT name, location, length_km FROM trails", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
