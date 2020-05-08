/****Models***/
const User = require('./user');
const Result = require('./result');
const Patient  = require('./patient');




User.hasMany(Result);
Result.belongsTo(Patient);





module.exports = {User,Result,Patient};
