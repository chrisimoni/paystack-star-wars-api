const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

//See https://sequelize.org/v5/manual/getting-started.html
module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER,  process.env.DB_PASS, {
    host:  process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});
  