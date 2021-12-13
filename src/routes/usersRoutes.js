const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');
const validations = require('../middlewares/userValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// const loginValidation = require('../middlewares/userLoginMiddleware');



router.get('/register', guestMiddleware, usersController.register );
router.post('/register', upload.single('image'), validations, usersController.create);

router.get('/login', guestMiddleware, usersController.login)
router.post('/login', usersController.loginProcess)

router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);


module.exports = router;