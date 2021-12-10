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
        }

        // let userInDb = db.Users.findByFIeld('email', req.body.email);
        let userInDb = db.Users.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(userInDb){
            return res.render('users/userCreate', {
                errors: {
                    email: {
                        msg: 'Este mail ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }
        
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

            return res.redirect('users/login')
            // .then(() => {
            //     res.redirect('users/login')
            // })
            .catch((e) => console.log(e))
        

    },
    login: (req, res) => {
        res.render('users/login', {
            style: '/css/login.css',
            title: 'login'
        });
    },
    loginProcess: (req, render) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    },
    profile: (req, res) => {
        return res.render('users/userProfile', {
            style: '/css/profile.css',
            title: 'perfil de usuario'
        });
    }

}


module.exports = usersController;