const Sequelize = require('sequelize');
const db = require('../config/db');


const Patient  = db.define('patient', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender:{
      type:Sequelize.BOOLEAN,
      allowNull:false,
    },
    phoneNumber:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false,
    }


});

module.exports = Patient;
