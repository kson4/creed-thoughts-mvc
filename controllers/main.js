const Post = require("../models/Post");

module.exports = {
  homePage: async (req, res) => {
    try {
      const posts = await Post.find();
      const featured = await Post.find({ featured: true });
      // console.log(posts);
      // console.log(featured);
      res.render("index.ejs", { posts: posts, featured: featured });
    } catch (err) {
      console.error(err);
    }
  },
};
