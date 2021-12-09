const session = require('express-session');
const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body("name")
        .notEmpty()
        .withMessage('Tienes que ingresar un nombre')
        .bail()
        .isLength({ min: 2, max: 100})
        .withMessage('el nombre debe contener al menos 2 caracteres'),
    body("lastName")
        .notEmpty()
        .withMessage('Tienes que ingresar tu apellido')
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage('el apellido debe contener entre 2 y 100 cracteres'),
    body("email")
        .notEmpty()
        .withMessage('debes iungresar un email')
        .bail()
        .isEmail()
        .withMessage('debes ingresar un formanto de email valido'),
    body('password')
        .notEmpty()
        .withMessage('debes ingresar una contraseña')
        .bail()
        .isLength({ min: 8, max: 20 })
        .withMessage('la contraseña debe tener al menos 8 caracteres '),
    body('city')
        .notEmpty()
        .withMessage('ingresa una ciudad')
        .bail()
        .isLength({ min: 2, max: 100})
        .withMessage('debe contener al menos 2 caracteres'),
    body('address')
        .notEmpty()
        .withMessage('ingresa tu dirección')
        .bail()
        .isLength({ min: 2, max: 100})
        .withMessage('debe contener al menos 2 caracteres'),
    body('number')
        .notEmpty()
        .withMessage('debes ingrersar un numero')
        .bail()
        .isLength({ min: 1 , max: 7})
        .withMessage('debes ingrersar al menos un numero'),

    body('postalCode')
        .notEmpty()
        .withMessage('ingresa tu codigo postal')
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('ingresa al menos 3 caracteres'),
    body('image').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtension = ['.jpg', '.png', '.gif'];
        let fileExtension = path.extname(file.originalname);
        if(!file){
            throw new Error('tienes que subir una imagen');
        }else{
            if(acceptedExtension.includes(fileExtension)){
                throw new Error(`las extensuones de los archivos deben ser ${acceptedExtension.join(', ')}`)
            }
        }
        return true;
    })


]

module.exports = validations;


