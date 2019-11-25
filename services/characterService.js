const axios = require('axios');

const movieService = require('../services/movieService');
const utils = require('../utils/util');

/**
 * Get all Movie characters
 */
exports.getMovieCharacters = async (movie_id, sortBy, gender, order) => {
    const movie = await movieService.getMovieById(movie_id);

    // Get movie characters
    const movieCharacters = await Promise.all(movie.characters.map( async url => {
        return this.getCharacterData(url);
    }));

    const sortedCharacters = await utils.sortCharacters(movieCharacters, sortBy, gender, order);

    return sortedCharacters;
};

/**
 * Get character details from URL
 */
exports.getCharacterData = async (url) => {
    const characterData = await axios.get(url);
    return characterData.data;
};