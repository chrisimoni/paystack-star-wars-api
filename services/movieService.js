const axios = require('axios');

/**
 * Get all movies
 */
exports.getAllMovies = async () => {
    const result = await axios.get('https://swapi.co/api/films');
    return result.data;
};

/**
 * Find movie by movie Id
 */
exports.getMovieById = async (movie_id) => {
    const result = await axios.get(`https://swapi.co/api/films/${movie_id}`);
    return result.data;
};