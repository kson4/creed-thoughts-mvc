const express = require("express");
const app = express();
const mongoDB = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
require("dotenv").config({ path: "./config/.env" });

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", mainRoutes);

// app.get("/", (req, res) => {
//   db.collection("posts")
//     .find()
//     .toArray()
//     .then((posts) => {
//       const featured = posts.filter((post) => post.featured === true);
//       res.render("index.ejs", { posts: posts, featured: featured });
//     });
// });

// app.get("/post/:id", (req, res) => {
//   const obj = new mongoDB.ObjectId(req.params.id);

//   db.collection("posts")
//     .findOne({ _id: obj })
//     .then((post) => {
//       res.render("post.ejs", { post: post });
//     });
// });

app.listen(process.env.PORT, () => {
  console.log("Server is running. You better go catch it!");
});
