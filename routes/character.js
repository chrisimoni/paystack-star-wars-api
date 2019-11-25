const express = require('express');

const characterController = require('../controllers/characterController');

const router = express.Router();

//Get character lists
router.get('/:movie_id', characterController.getMovieCharacters);

module.exports = router;