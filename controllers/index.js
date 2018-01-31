const express = require('express');
const router = express.Router();;
const postController = require('./post.controller');

router.use('/post', postController);

module.exports = router;