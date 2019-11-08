const joi = require('@hapi/joi');

const utils = require('../utils/util');
const commentService = require('../services/commentService');
const movieService = require('../services/movieService');

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
            status: false,
            message: result.error.details,
        });
    }

    //Get Movie list
    let {results} = await movieService.getAllMovies();

    let movieId = parseInt(req.body.movie_id);

    let found = results.find(element => {
        let id = utils.extractMovieId(element.url)
        if(id == movieId) {
            return true;
        }

        return false;
    })
    
    //Movie not found
    if(!found) {
        return res.status(400).json({
            status: 'Error',
            message: `No Movie is associated with the id ${movieId}`
        });
    }
    
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const comment = req.body.comment;

    await commentService.addComment({
        movie_id: movieId,
        comment: comment,
        public_ip: ip
    });

    res.status(200).json({
        status: 'Success',
        message: 'Comment saved successfully!'
    })
}