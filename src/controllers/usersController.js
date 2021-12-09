const path = require('path');
const db = require('../database/models');
const sequelize = require('sequelize');
const Op = db.sequelize.Op;
const bcryptjs = require('bcryptjs');
const  { validationResult } = require('express-validator');


const usersController = {
    register: (req, res) => {
        res.render('users/userCreate');
    },
    create:  (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('users/userCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }else{

            db.Users.create({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                city: req.body.city,
                address: req.body.address,
                number: req.body.number,
                image: req.file ? req.file.filename : '',
                role: 2
            })
            .catch((e) => console.log(e))
            return res.redirect('users/login');
        }

    },
    login: (req, res) => {
        res.render('users/login');
    }

}


module.exports = usersController;