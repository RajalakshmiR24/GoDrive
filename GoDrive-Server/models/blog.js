const mongoose = require('mongoose');

const subheadingSchema = new mongoose.Schema({
  subheading: String,
  subsection_content: String,
});

const contentSchema = new mongoose.Schema({
  heading: String,
  body: String,
  subheadings: [subheadingSchema], // Array of subheadings
  conclusion: String,
});

const blogSchema = new mongoose.Schema({
  title: String,
  img: String,
  content: contentSchema,
  date: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
