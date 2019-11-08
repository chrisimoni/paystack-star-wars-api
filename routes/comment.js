const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

//Get movie list with opening crawls and comment counts
router.post('/', commentController.addComment);

module.exports = router;