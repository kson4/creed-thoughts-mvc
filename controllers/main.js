const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const User = require("../models/User");

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
  login: async (req, res) => {},
  signup: async (req, res) => {
    const users = await User.find({});
    console.log(users);

    console.log(req.body);
    try {
      const hash = await bcrypt.hash(req.body.signupPassword, 10);
      const user = await User.create({
        firstName: req.body.signupFirstName,
        lastName: req.body.signupLastName,
        email: req.body.signupEmail,
        password: hash,
      });
      console.log(user);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  },
};
