const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

exports.getMovieLists = async (req, res) => {
    try {
        const data = await movieService.getAllMovies();
        const sortedResults = utils.sortMoviesByReleaseDate(data.results);

        const movies = [];

        for(const movie of sortedResults) {
            //Extract movie id from url
            const movie_id = utils.extractMovieId(movie.url);
            const comments = await commentService.getCommentsAndCount(movie_id);
            movies.push({
                movie_id: movie_id,
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                release_date: movie.release_date,
                comment_count: comments.count
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'All movies retrieved',
            data: movies
        });
    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
    
};
