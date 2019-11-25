const characterService = require('../services/characterService');
const utils = require('../utils/util');

/**
 * Get Movie characters
 */
exports.getMovieCharacters = async (req, res) => {
    try {
        
        const movie_id = req.params.movie_id;
        const {sortBy, gender, order} = req.query;

        //Check if parameter value of sortBy is name or gender or height
        if(sortBy) {
            if (sortBy !== 'name' && sortBy !== 'gender' && sortBy !== 'height') {
                return res.status(400).json({
                    'status': 'Error',
                    'message': 'Parameter value of sortBy must be name or gender or height'
                });
            }
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

        const characters = await characterService.getMovieCharacters(movie_id, sortBy, gender, order);
        
        // Calculate the total height of characters
        const totalHeight = characters.reduce((total, character) => {
            total += isNaN(character.height) ? 0 : parseInt(character.height);
            return total;
        }, 0);

        const heightInFeetAndInches = await utils.convertCentimeterToFeetAndInches(totalHeight);
        
        res.status(200).json({
            status: 'Success',
            message: 'All characters retrieved',
            data: {
                movie_id: parseInt(movie_id),
                characters
            },
            meta: {
                total_characters: characters.length,
                total_height: heightInFeetAndInches
                
            }
        });

    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }

};