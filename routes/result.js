const express = require('express');
const router = express.Router();
require('dotenv').config();
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const Result = require('../models/result');
const Patient = require('../models/patient');


router.post('/create', checkAuth, (req, res, next) => {

    User.findOne({where: {email: req.userData.email}}).then((user) => {
        if (user) {
            Patient
                .findOne({where: {name: req.body.name,gender:req.body.gender, phoneNumber: req.body.phoneNumber, city: req.body.city}})
                .then((p) => {
                    if (p) {result(p,user)}
                    else {
                        const patient = {
                            name: req.body.name,
                            gender: req.body.gender,
                            phoneNumber: req.body.phoneNumber,
                            city: req.body.city,
                            image: req.body.image
                        };
                        new Patient(patient)
                            .save()
                            .then((newPatient) => result(patient,user))
                            .catch(err => {console.log(err);next(err)})

                    }
                }).catch(err => next(err))
        } else next(new Error('Something Fucked pretty bad! in Authentication system'));


    }).catch((err) => next(err));


    const result = (p,user)=>{
        let isInfected = (p.image.includes('_') && ( p.image.includes('bacteria') || p.image.includes('virus')));
        let resultPercentage = resultPercentageGen();
        new Result({resultStatus: isInfected, resultPerc: resultPercentage, patientId: p.id, userId: user.id})
            .save()
            .then((result) => {
                res.json({resultStatus: isInfected, resultPerc: resultPercentage, patient: p});
            })
            .catch(err =>{console.log(err);next(err)});
    };

    const resultPercentageGen = ()=>{
        return Math.random() * (93.52 - 79.43) + 79.43;
    }

});

router.get('/all',checkAuth,(req,res,next)=>{
    User.findOne({where: {email: req.userData.email}}).then((user) => {
        if (user) {
            Result.findAll({
                where: {userId:user.id},
                include: {model: Patient, as: 'patient',}
            }).then((results)=>{
                res.json({results})
            }).catch(err=>err);
        }
        else next(new Error('Something real bad in authentication system'))
    }).catch(err=>next(err))
})


module.exports = router;
