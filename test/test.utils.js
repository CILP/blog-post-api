const request = require('request');
const mongoose = require('mongoose');
const Post = require('../models/post');
const { db } = require('../config');
const { host, port, database } = db.mongo;

mongoose.connect(`mongodb://${host}:${port}/${database}`);

function createTestPost(options, headers, json) {
  return new Promise(function(resolve, reject) {
    request({...options, headers, json}, function(error, response, body) {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function removeTestPosts() {
  return new Promise(function(resolve, reject) {
    Post.remove({title: 'Test Post'}).then(function(result) {
      resolve(result);
      mongoose.disconnect();
    }, function(err) {
      reject(err);
    });
  });
}

module.exports = { createTestPost, removeTestPosts };
