const path = require('path');
const db = require('../database/models');
const sequelize = require('sequelize');
const Op = db.sequelize.Op;
const bcryptjs = require('bcryptjs');
const  { validationResult } = require('express-validator');


const usersController = {
    register: (req, res) => {
        res.render('users/userCreate', {
            style: '/css/register.css',
            title: 'Creacion de cuentas'
        });
    },
    create:  async (req, res) => {
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            return res.render('users/userCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                style: '/css/register.css',
                title: 'Creacion de cuentas'
            });
        }

        let userInDb = await db.Users.findOne({
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
                oldData: req.body,
                style: '/css/register.css',
                title: 'Creacion de cuentas'
            })
        }
        
            await db.Users.create({
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

            return res.redirect('login')
            .catch((e) => console.log(e))
        

    },
    login: (req, res) => {
        
        res.render('users/login', {
            style: '/css/login.css',
            title: 'login'
        });
    },
    loginProcess: async (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('users/login', { 
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        let userToLogin = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        });
        
        if(userToLogin){
            // return res.send(req.body);
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.remember_user){
                    res.cookie("userEmail", req.body.email, { maxAge: 1000  * 60 * 5 })
                }
                return res.redirect('profile')
            }
            
            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'contraseña incorrecta'
                    }
                },
                style: '/css/login.css',
                title: 'login'
            })
            
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'este mail no se encuentra registrado'
                }
            },
            style: '/css/login.css',
            title: 'login'
        
        });

    },
    profile: (req, res) => {
        console.log(req.cookies.userEmail);
        // console.log(req.session);
        return res.render('users/userProfile', {
            style: '/css/profile.css',
            title: 'perfil de usuario',
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/products/list');
    }

}


module.exports = usersController;