const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const accessToken = require('../middlewares/access-token.middleware');

router.post('/', accessToken, function(req, res) {
  const post = new Post(req.body);

  if (!post.validateSync()) {
    post.save().then(function(result) {
      res.json({success: true, message: 'Post created', data: {id: result._id}, timestamp: Date.now()});
    }, function(err) {
      res.json({success: false, message: err.message, timestamp: Date.now()});
    });
  } else {
    res.json({success: false, message: 'Invalid Model', timestamp: Date.now()});
  }
});

router.patch('/:id', function(req, res) {
  Post.update({_id: req.params.id}, {$set: req.body}).then(function(result) {
    res.json({success: true, message: 'Post updated', data: {id: req.params.id}, timestamp: Date.now()});
  }, function(err) {
    res.json({success: false, message: err.message, timestamp: Date.now()});
  });
});

router.get('/', function(req, res) {
  Post.find({}).then(function(result) {
    res.json({success: true, message: '', data: {posts: result}, timestamp: Date.now()})
  }, function(err) {
    res.json({success: false, message: err.message, timestamp: Date.now()});
  });
})

router.get('/:id', function(req, res) {
  Post.findOne({_id: req.params.id}).then(function(result) {
    res.json({success: true, message: '', data: {post: result}, timestamp: Date.now()});
  }, function(err) {
    res.json({success: false, message: err.message, timestamp: Date.now()});
  });
})

module.exports = router