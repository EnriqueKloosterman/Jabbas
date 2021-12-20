const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multerPruducts')


const productController = require('../controllers/productController');

router.get('/list', productController.list);
router.get('/error', productController.error);

router.get('/create', productController.create);
router.post('/create', upload.array("image", 4), productController.store);

router.get('/detail/:id', productController.detail);

router.get('/edit/:id', productController.editView);
router.delete("/delete/:id", productController.destroy);
router.post('/:id', upload.array("image", 4), productController.update);


module.exports = router