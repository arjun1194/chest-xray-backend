const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
/* GET home page. */



router.get('/', checkAuth,(req, res, next)=> {
  res.json({message:'hello world'});
});

module.exports = router;
