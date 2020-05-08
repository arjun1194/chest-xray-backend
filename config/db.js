const Sequelize = require('sequelize');
require('dotenv').config();
module.exports = new Sequelize(process.env.MYSQL_D,process.env.MYSQL_U , process.env.MYSQL_P, {
    host:process.env.MYSQL_H,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    logging: false

});
