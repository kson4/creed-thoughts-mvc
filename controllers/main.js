const Post = require("../models/Post");

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
};
