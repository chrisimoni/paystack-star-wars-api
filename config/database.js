const Sequelize = require('sequelize');

//See https://sequelize.org/v5/manual/getting-started.html
module.exports = new Sequelize('starwars', 'chrisreal', 'daughtry', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});
  