const mongoDB = require("mongodb");
const Post = require("../models/Post");

module.exports = {
  showPost: async (req, res) => {
    const id = new mongoDB.ObjectId(req.params.id);
    try {
      const posts = await Post.find({ _id: id });
      res.render("post.ejs", { post: posts[0] });
    } catch (err) {
      console.error(err);
    }
  },
};

// app.get("/post/:id", (req, res) => {
//   const obj = new mongoDB.ObjectId(req.params.id);

//   db.collection("posts")
//     .findOne({ _id: obj })
//     .then((post) => {
//       res.render("post.ejs", { post: post });
//     });
// });
