const Sequelize = require('sequelize');
const db = require('../config/db');


const User  = db.define('user', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password:{
        type:Sequelize.STRING(25),
        allowNull: false
    }
});

module.exports = User;
