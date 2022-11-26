const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errorMessages = { firstName: "", lastName: "", password: "", email: "" };

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errorMessages[error.properties.path] = error.properties.message;
    });
  }
  if (err.message.includes("E11000 duplicate key error")) {
    errorMessages.email = "This email is already registered";
  }
  if (err.message === "Email does not exist") {
    errorMessages.email = "This email is not registered";
  }
  if (err.message === "Incorrect password") {
    errorMessages.password = "This password is incorrect";
  }
  return errorMessages;
};

// create the jwt token
const maxAge = 3 * 24 * 60 * 60; // expires in 3 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: maxAge,
  });
};

module.exports = {
  homePage: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: "descending" });
      const nonfeatured = await Post.find({ featured: false }).sort({
        date: "descending",
      });
      const featured = await Post.find({ featured: true }).sort({
        date: "descending",
      });
      const finance = await Post.find({ category: { $in: "Finance" } }).sort({
        date: "descending",
      });
      const justThoughts = await Post.find({
        category: { $in: "Just-Thoughts" },
      }).sort({
        date: "descending",
      });
      res.render("index.ejs", {
        posts: posts,
        nonfeatured: nonfeatured,
        featured: featured,
        finance: finance,
        justThoughts: justThoughts,
      });
    } catch (err) {
      console.error(err);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  },
  signup: async (req, res) => {
    try {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      console.log(`Errors: ${JSON.stringify(errors)}`);
      res.status(400).json({ errors });
    }
  },
  logout: async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  },
};
