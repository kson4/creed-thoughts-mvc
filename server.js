const express = require("express");
const app = express();
const mongoDB = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload");
const contactRoutes = require("./routes/contact");
const { requireAuth, checkUser } = require("./middleware/auth");
require("dotenv").config({ path: "./config/.env" });
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/upload", uploadRoutes);
app.use("/contact", contactRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running. You better go catch it!");
});
