const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "Hello",
      description: "random data you shouldnt access",
    },
  });
});

module.exports = router;
