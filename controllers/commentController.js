const joi = require('@hapi/joi');

const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

/**
 * Add Comments
 */
exports.addComment = async (req, res) => {   
    //Setup Validation
    const schema = joi.object().keys({
        comment: joi.string().trim().max(500).required(),
        movie_id: joi.number().required()
    });

    const result = schema.validate(req.body);

    //Validation error
    if(result.error != null){
        return  res.status(400).json({
            status: 'Error',
            message: result.error.details,
        });
    }

    //Get Movie list
    let {results} = await movieService.getAllMovies();

    let movieId = parseInt(req.body.movie_id);

    let found = utils.checkMovieExist(results, movieId);
    
    //Movie not found
    if(!found) {
        return res.status(400).json({
            status: 'Error',
            message: `No Movie is associated with the id ${movieId}`
        });
    }
    
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const comment = req.body.comment;

    await commentService.addComment(req, res, {
        movie_id: movieId,
        comment: comment,
        public_ip: ip
    });

    res.status(200).json({
        status: 'Success',
        message: 'Comment saved successfully!'
    })
};

/**
 * Get Comments by Movie Id
 */
exports.getCommentsByMovieId = async (req, res) => {
    const movieId = req.params.movieId;
    let message = 'comments retrieved successfully';
    let {count, rows} = await commentService.getCommentsAndCount(req, res, movieId);

    if(count <= 0) {
        message = `No comment found for movie with id ${movieId}`;
    }

    return res.json({
        status: 'Success',
        message: message,
        comments: rows
    });
};