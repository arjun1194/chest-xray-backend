const Sequelize = require('sequelize');
const db = require('../config/db');


const Result  = db.define('result', {
    // attributes
    resultStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    resultPerc: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});

module.exports = Result;
