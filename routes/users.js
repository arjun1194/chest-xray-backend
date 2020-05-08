const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User  = require('../models/user');


/* GET users listing. */
router.post('/signup',(req,res,next)=>{

    new User({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    })
        .save()
        .then((user) => {
           res.json({message:'Success! Account Created!'});
        }).catch(err =>next(err))

});

router.post('/login',(req,res,next)=>{
    const error = new Error();
    error.message = 'Maybe username or password is incorrect';

    User.findOne({where:{email:req.body.email}}).then((user)=>{
        if(user && user.password===req.body.password){
            const token  = jwt.sign({email: user.email, name: user.name}, process.env.JWT_SECRET, {expiresIn: '100h'});
            res.json({message:'Login Successfull',token:token})
        }
        else{
            next(error);
        }
    }).catch(err=>next(err));

});


module.exports = router;
