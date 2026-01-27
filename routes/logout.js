const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    console.log("Session stoped");

    res.redirect("/login");
  });
});

module.exports = router;
