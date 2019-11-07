const express = require('express');

const movieController = require('../controllers/movieController');


const router = express.Router();

//Get movie list with opening crawls and comment counts
router.get('/', movieController.getMovieLists);

module.exports = router;