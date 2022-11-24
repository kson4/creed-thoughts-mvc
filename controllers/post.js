const mongoDB = require("mongodb");
const Post = require("../models/Post");

module.exports = {
  showPost: async (req, res) => {
    const id = new mongoDB.ObjectId(req.params.id);
    const posts = await Post.find().sort({ date: "descending" });
    const finance = await Post.find({ category: { $in: "Finance" } }).sort({
      date: "descending",
    });
    const justThoughts = await Post.find({
      category: { $in: "Just-Thoughts" },
    }).sort({
      date: "descending",
    });
    try {
      const posts = await Post.find({ _id: id });
      res.render("post.ejs", {
        post: posts[0],
        posts: posts,
        finance: finance,
        justThoughts: justThoughts,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
