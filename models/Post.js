const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
