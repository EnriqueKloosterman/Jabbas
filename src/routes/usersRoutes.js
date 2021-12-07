const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');


router.get('/register', usersController.register );
router.post('/create', upload.single('image'), usersController.create);

router.get('/login', usersController.login)



module.exports = router;