const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const History = sequelize.define('History', {
    submissionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    diagnosis: {
            type: Sequelize.STRING,
            allowNull: false
    },
    certainty: {
        type: Sequelize.STRING
    }
});

module.exports = History;