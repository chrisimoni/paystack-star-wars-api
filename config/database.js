const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  dialect: 'postgres',
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

let sequelize;

if(process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
}else {
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, config);
}

module.exports = sequelize;