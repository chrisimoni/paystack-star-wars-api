const joi = require('@hapi/joi');

const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

/**
 * Add Comments
 */
exports.addComment = async (req, res) => {   
    try {
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
        const {results} = await movieService.getAllMovies();
        const movie_id = parseInt(req.body.movie_id);
        const found = utils.checkMovieExist(results, movie_id);
        
        //Movie not found
        if(!found) {
            return res.status(400).json({
                status: 'Error',
                message: `No Movie is associated with the id ${movie_id}`
            });
        }
        
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const comment = req.body.comment;

        await commentService.addComment({
            movie_id: movie_id,
            comment: comment,
            public_ip: ip
        });

        res.status(200).json({
            status: 'Success',
            message: 'Comment saved successfully!'
        });
        
    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: `Something is wrong with your data model. ${err.message}`
        });
    }
    
};

/**
 * Get Comments by Movie Id
 */
exports.getCommentsByMovieId = async (req, res) => {
    const movie_id = req.params.movie_id;
    const {count, rows} = await commentService.getCommentsAndCount(movie_id);
    const message = count <= 0 ? `No comment found for movie with id ${movie_id}` : 'comments retrieved successfully';

    return res.json({
        status: 'Success',
        message: message,
        comments: rows
    });
};