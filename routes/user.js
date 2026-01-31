const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/autorization");

// Route that returns user name
router.get("/", requireLogin, (req, res) => {
  res.json({ user_name: req.session.user.user_name });
});

module.exports = router;
