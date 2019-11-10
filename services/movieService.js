const axios = require('axios');

/**
 * Get all movies
 */
exports.getAllMovies = async (req, res) => {
    try {
        const result = await axios.get('https://swapi.co/api/films');
        return result.data;
    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
};

/**
 * Find movie by movie Id
 */
exports.getMovieById = async (req, res, movieId) => {
    try {
        const result = await axios.get(`https://swapi.co/api/films/${movieId}`);
        return result.data;
    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: `${err.message}. Cannot find Movie or URL`
        });
    }
};