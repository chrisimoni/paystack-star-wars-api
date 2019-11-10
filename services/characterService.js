const axios = require('axios');

const movieService = require('../services/movieService')

/**
 * Get all Movie characters
 */
exports.getMovieCharacters = async (req, res, movieId) => {
    try {
        const movie = await movieService.getMovieById(req, res, movieId);

        let movieCharacters = await Promise.all(movie.characters.map( async url => {
            return this.getCharacterData(req, res, url);
        }));

        return movieCharacters;

    }catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};

/**
 * Get character details from URL
 */
exports.getCharacterData = async (req, res, url) => {
    try {
        const characterData = await axios.get(url);
        return characterData.data;
    }catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};