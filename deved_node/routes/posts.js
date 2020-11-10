const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
router.get("/", (req, res) => {
  res.send("we are having posts");
});
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
