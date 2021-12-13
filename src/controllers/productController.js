const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;



const productController = {

    list: (req, res) => {
        db.Products.findAll({include: ["image", "brand", "type"]})
        .then(products => {
            res.render('products/productList', {products: products, title: 'listado de productos', style: '/css/list.css'}, );
        })
        .catch((e) => console.log(e))
        // res.render('productList');
    },
    create: (req, res) => {
        let brandDb = db.Brand.findAll();
        let typeDb = db.Type.findAll();
        //let collectionDb = db.Collection.findAll();

        Promise.all([brandDb, typeDb])
        .then(function([brand, type]){
            return res.render('products/productCreate', {
                brand, type
            });
        })
        .catch((e) => console.log(e));
        


    },
    store: async (req, res) => {
        const newProduct = await db.Products.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brand_id: req.body.brand
        });
        let images= [];
        for(let i = 0; i < req.files.length; i++){
            images.push(req.files[i].filename);
        }
        for(let i = 0; i < images.length; i++){
            await newProduct.createImage({ name: images[i] });    
        }
        return res.redirect('detail/' + newProduct.id);
    },
    error: (req, res) => {
        return res.render('error');
    },
    detail: async(req, res) => {
        const id = req.params.id;
        db.Products.findByPk(id, {
            include: ["image", "brand"]
        })
        .then(product => {
            res.render('products/productsDetail', { detailProduct: product});
        })        
    },
    editView: async (req, res) => {
        let id = req.params.id;
        let brand = await db.Brand.findAll();
        let type = await db.Type.findAll();

        let productToEdit = await db.Products.findByPk(id, {
            include: ["image", "brand", "type"]
        })
        return res.render("products/productsEdit",{
            productToEdit, brand, type
        })
        
    },
    update: async (req, res) => {
        let id = req.params.id;
        await db.Products.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brand_id: req.body.brand,
            type_id: req.body.type
        },
        {
            where: {
                id: id
            }
        });

        let editProduct = await db.Products.findByPk(id, {
            include: "image",
        });

        let images = [];
        for(let i = 0; i < req.files.length; i++){
            images.push(req.files[i].filename);
        }
        for(let i = 0; i < images.length; i++){
            await editProduct.createImage({ name: images[i]});
        }
        return res.redirect('detail/' + id);
    },

    destroy:  (req, res) => {
        // let id = req.params.id;
        // let product = await db.Products.findByPk(id);
        // await product.removeImage([id]);

        // await db.Products.destroy({
        //     where: {
        //         id: id
        //     }
        // });
        // return res.redirect('list')

        let id = req.params.id;

        let delimg = db.Image.destroy({
            where:{
                product_id: id
            }
        })

        let delProd = db.Products.destroy({
            where:{
                id: id
            }
        })
        Promise.all([delimg, delProd])
        .then(()=> res.redirect('products/productList'))
        
    }
}

module.exports = productController;