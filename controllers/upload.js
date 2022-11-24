const mongoDB = require("mongodb");
const Post = require("../models/Post");

module.exports = {
  show: async (req, res) => {
    res.render("create-post.ejs");
  },
  createPost: async (req, res) => {
    const categoryArray = req.body.category.trim().split(/\s+/);
    await Post.create({
      title: req.body.title,
      date: Date.now(),
      content: req.body.content.split(/\\/),
      featured: req.body.featured === "on",
      category: categoryArray,
      img: req.body.img,
    });
    res.redirect("/upload");
  },
};
