const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

exports.getMovieLists = async (req, res) => {
    try {
        let data = await movieService.getAllMovies();
        let sortedResults = utils.sortMoviesByReleaseDate(data.results);

        let movies = [];

        for(let movie of sortedResults) {
            //Extract movie id from url
            let movieId = utils.extractMovieId(movie.url);
            let comments = await commentService.getCommentCount(movieId);
            movies.push({
                movie_id: movieId,
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                release_date: movie.release_date,
                comment_count: comments.count
            });
        }
        res.status(200).json({
            message: 'All movies retrieved',
            movies: movies
        });
    } catch(err) {
        res.status(500).json({msg: err});
    }
    
};
