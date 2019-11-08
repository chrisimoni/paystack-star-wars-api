const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    public_ip: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Sync model to the database by creating appropraite tables
//sequelize.sync();

module.exports = Comment;

