const characterService = require('../services/characterService');
const utils = require('../utils/util');

/**
 * Get Movie characters
 */
exports.getMovieCharacters = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        let characters = await characterService.getMovieCharacters(req, res, movieId);
        
        const {sortBy, gender, order} = req.query;

        //Check if parameter value of sortBy is name or gender or height
        if(sortBy) {
            if (sortBy !== 'name' && sortBy !== 'gender' && sortBy !== 'height') {
                return res.status(400).json({
                    'status': 'Error',
                    'message': 'Parameter value of sortBy must be name or gender or height'
                });
            }

            if (gender){
                if (gender !== 'male' && gender !== 'female'){
                   return res.status(400).json({
                        'status': 'Error',
                        'message': 'Parameter value of Gender must be male or female'
                    });
                }
            }

            if (order){
                if (order !== 'asc' && order !== 'desc') {
                    return res.status(400).json({
                        'status': 'Error',
                        'message': 'Parameter value of Order must be asc or desc'
                    });
                }
            }

            characters = await utils.sortCharacters(characters, sortBy, gender, order);
        }

        res.status(200).json({
            status: 'Success',
            message: 'All movies retrieved',
            characters
        });

    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }

};