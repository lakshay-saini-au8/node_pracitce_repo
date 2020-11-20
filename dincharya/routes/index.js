const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middileware/auth");

const Story = require("../models/Story");

// @desc    Login/Landing   page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashborad   page
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
  // console.log(req.user);
});

module.exports = router;
