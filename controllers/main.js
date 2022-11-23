const Post = require("../models/Post");

module.exports = {
  homePage: async (req, res) => {
    try {
      const posts = await Post.find();
      const featured = await Post.find({ featured: true });
      const finance = await Post.find({ category: { $in: "Finance" } });
      res.render("index.ejs", {
        posts: posts,
        featured: featured,
        finance: finance,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
