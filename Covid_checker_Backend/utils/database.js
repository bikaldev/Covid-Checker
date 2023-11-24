const Sequelize = require('sequelize');

const sequelize = new Sequelize('covidchecker', 'root', 'covidchecker', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;