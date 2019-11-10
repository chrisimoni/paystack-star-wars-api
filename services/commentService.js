const Comment = require('../models/comment');

/**
 * Get comments and count by movie_id
 */
exports.getCommentsAndCount = async (req, res, movie_id) => {
    try {
        let c = 0;
        const commentCount = await Comment.findAndCountAll({
            where: {
                movie_id: movie_id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })

        return commentCount;

    } catch(err) {
        res.status(500).json({
            status: 'Error',
            message: `Something is wrong with your data model. ${err.message}`
        });
    }
};

/**
 * Add comment
 */
exports.addComment = async (req, res, movieId) => {
    try {
        await Comment.create(data);

    }catch (err) {
        res.status(500).json({
            status: 'Error',
            message: `Something is wrong with your data model. ${err.message}`
        });
    }

};