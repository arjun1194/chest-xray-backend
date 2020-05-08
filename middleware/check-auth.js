const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkAuth = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (e) {
        return res.status(401).json({message: 'Authentication failed '})
    }

};

module.exports = checkAuth;

