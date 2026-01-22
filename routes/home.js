const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FE/home.html"));
});

router.get("/trails", (req, res) => {
  db.query("SELECT name, location, length_km FROM trails", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
