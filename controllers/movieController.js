const axios = require('axios');
const utils = require('../utils/util');

const getMovieLists = async function(req, res) {
    axios.get('https://swapi.co/api/films')
    .then((response) => {
        let { data } =  response;
        let sortedResults = utils.sortMoviesByReleaseDate(data.results);

        let movies = [];

        for(let movie of sortedResults) {
            movies.push({
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                release_date: movie.release_date,
                comment_count: 10
            });
        }
        res.status(200).json({
            message: 'All movies retrieved',
            movies: movies
        });
    })
    .catch(error => {
        res.status(500).json( {message: `Something went wrong. ${error}`} );
    });
};

exports.getMovieLists = getMovieLists;