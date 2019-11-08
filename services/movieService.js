const axios = require('axios');

/**
 * Get all movies
 */
exports.getAllMovies = async () => {
    try {
        const result = await axios.get('https://swapi.co/api/films')
        return result.data;

    } catch(err) {
        return err;
    }
};

/**
 * Find movie by movie Id
 */
exports.getMovieById = async (movieId) => {
    try {
        const result = await axios.get(`https://swapi.co/api/films/${movieId}`)
        return result.data;
    } catch(err) {
        return err;
    }
};