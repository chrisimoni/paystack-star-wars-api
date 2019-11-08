const Comment = require('../models/comment');

/**
 * Get comment count by movie_id
 */
exports.getCommentCount = async (movie_id) => {
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
        return err;
    }
};

/**
 * Add comment
 */
exports.addComment = async (data) => {
    try {
        await Comment.create(data);

    }catch (err) {
        return err;
    }

};