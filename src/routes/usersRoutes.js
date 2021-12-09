const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');
const validations = require('../middlewares/userValidations');



router.get('/register', usersController.register );
router.post('/register', upload.single('image'), validations, usersController.create);

router.get('/login', usersController.login)



module.exports = router;