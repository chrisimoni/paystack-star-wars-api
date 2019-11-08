const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

const getMovieLists = async (req, res) => {
    try {
        let data = await movieService.getAllMovies();
        let sortedResults = utils.sortMoviesByReleaseDate(data.results);

        let movies = [];

        for(let movie of sortedResults) {
            let comments = await commentService.getCommentCount(movie.episode_id);
            movies.push({
                episode_id: movie.episode_id,
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

exports.getMovieLists = getMovieLists;