const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if user is present or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassowrd = await bcrypt.hash(req.body.password, salt);
  // create new user
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassowrd,
    });
    const result = await user.save();
    res.status(200).send({ user: result._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  // validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if user is present or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exit");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send(" password is wrong");

  // create  and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TO_SEC);
  res.header("auth-token", token).send(token);
});

module.exports = router;
