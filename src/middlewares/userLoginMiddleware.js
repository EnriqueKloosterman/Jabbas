const session = require('express-session');
const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body('email')
        .notEmpty()
        .withMessage('Ingresa tu email')
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage('email no valido'),
    password('password')
        .notEmpty()
        .withMessage('Ingrersa tu contraseña')
        .bail()
        .isLength({ min: 8 })
        .withMessage('la contraseña debe tener al meno 8 caracteres')
]

module.exports = validations;