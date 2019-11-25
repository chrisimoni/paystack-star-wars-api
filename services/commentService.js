const Comment = require('../models/comment');

/**
 * Get comments and count by movie_id
 */
exports.getCommentsAndCount = async (movie_id) => {
    return await Comment.findAndCountAll({
        where: {
            movie_id: movie_id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });
    
};

/**
 * Add comment
 */
exports.addComment = async (data) => {
    await Comment.create(data);
};