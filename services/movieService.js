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
}