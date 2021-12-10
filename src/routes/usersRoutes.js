const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');
const validations = require('../middlewares/userValidations');
// const loginValidation = require('../middlewares/userLoginMiddleware');



router.get('/register', usersController.register );
router.post('/register', upload.single('image'), validations, usersController.create);

router.get('/login', usersController.login)
router.get('/login', usersController.loginProcess)

router.get('/profile', usersController.profile);



module.exports = router;