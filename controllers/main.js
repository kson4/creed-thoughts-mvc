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
      const finance = await Post.find({ category: { $in: "Finance" } });
      res.render("index.ejs", {
        posts: posts,
        nonfeatured: nonfeatured,
        featured: featured,
        finance: finance,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
