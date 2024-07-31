const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  user: String,
  title: String,
  body: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;