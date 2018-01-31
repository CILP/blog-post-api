const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is needed']
  },
  author: {
    type: String,
    required: [true, 'Author is needed']
  },
  content: {
    type: String,
    required: [true, 'Content is needed']
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);