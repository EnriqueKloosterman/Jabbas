const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;



const productController = {
    
    list: (req, res) => {
        db.Products.findAll({include: ["image", "detail", "brand", "type", "collection"]})
        .then(products => {
            res.render('products/productList', {products: products, title: 'listado de productos', style: '/css/list.css'}, );
        })
        .catch((e) => console.log(e))
        // res.render('productList');
    },
    show: async (req, res) => {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        let page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
            page = pageAsNumber;
        }
        let size = 12;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 16){
            size = sizeAsNumber;
        }

        let collection = req.params.collection;
        let products;

        try{
            products = await db.Products.findAndCoun.All({
                distinct: true,
                limit: size,
                offset: page * size,
                include: ["images", "collection", "brand"]
            });
        }
        catch(e){
            res.send(e)
        }

        let productsToShow;

        if(collection){
            let productsCollection = await db.Collection.findOne({
                where:{
                    name: collection
                }
            })
            if(productsCollection){
                productsToShow = await db.Products.findAndCountAll({
                    distinct: true,
                    limit: size,
                    offset: page * size,
                    include: ["images", "collection", "brand"],
                    where:{
                        collection_id: collection.id
                    }
                })
            }
            if(productsToShow){
                return res.render('products/productsShow', {
                    products: productsToShow.rows,
                    totalPages: Math.ceil(productsToShow.count / size),
                    size: size
                })
            }
        }


    },
    create: (req, res) => {
        let brandDb = db.Brand.findAll();
        let typeDb = db.Type.findAll();
        let collectionDb = db.Collection.findAll();

        Promise.all([brandDb, typeDb, collectionDb])
        .then(function([brand, type, collection]){
            return res.render('products/productCreate', {
                brand, type, collection
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
            brand_id: req.body.brand,
            collection_id: req.body.collection
        });

        let textFields = [];
        for(let i = 0; i < req.body.detail.length; i++){
            textFields.push(req.body.detail[i]);
        }
        for(let i= 0; i < textFields.length; i++){
            await newProduct.createDetail({ detail: textFields[i]});
        }

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
        // const id = req.params.id;
        // db.Products.findByPk(id, {
        //     include: ["image", "detail", "brand", "collection", "type"]
        // })
        // .then(product => {
        //     res.render('products/productsDetail', { detailProduct: product});
        // })
        // .catch((e) => res.send(e))    

        const id = req.params.id;
        let brand = await db.Brand.findAll();
        let type = await db.Type.findAll();
        let collection = await db.Collection.findAll();

        let detailProduct = await db.Products.findByPk(id , {
            include: ["image", "detail", "brand", "collection", "type"]
        })
        return res.render('products/productsDetail', {
            detailProduct, brand, collection, type
        })
    },
    collection: async (req, res) => {
        let collection = await db.Collection.findAll();
        return res.render("products/productsCollection", {
            collection: collection
        });
    },
    collectionSelected: async (req, res ) => {
        let collection = req.params.collection;

        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        let page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
            page = pageAsNumber;
        }
        let size = 12;
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 16){
            size = sizeAsNumber;
        }

        let collectionToShow;
        let productToShow;

        try{
            collectionToShow = await db.Collection.findOne({
                where:{
                    name: collection,
                },
            });
        } catch(e) {
            return res.send(e);
        }

        try {
            productToShow = await db.Products.findAndCountAll({
                limit: size,
                distinct: true,
                offset: page * size,
                include: ["image", "detail"],
                where: {
                    collection_id: collectionToShow.id
                }
            })
        } catch(e) {
            return res.send(e);
        }

        return res.render("products/productsShow", {
            products: productToShow.rows,
            collection: collectionToShow,
            totalPages: Math.ceil(productToShow.count / size),
            size: size,
        });

    },
    editView: async (req, res) => {
        let id = req.params.id;
        let brand = await db.Brand.findAll();
        let type = await db.Type.findAll();
        let collection = await db.Collection.findAll();

        let productToEdit = await db.Products.findByPk(id, {
            include: ["image", "detail", "brand", "collection", "type" ]
        })
        return res.render("products/productsEdit",{
            productToEdit, brand, collection, type
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
            collection_id: req.body.collection,
            type_id: req.body.type
        },
        {
            where: {
                id: id
            }
        });

        const editProduct = await db.Products.findByPk(id, {
            include: ["image", "detail"]
        });

        await db.Detail.destroy({
            where: {
                product_id: req.params.id
            }
        })

        let textFields = [];
        for(let i = 0; i < req.body.detail.length; i++){
            textFields.push(req.body.detail[i]);
        }
        for(let i= 0; i < textFields.length; i++){
            await editProduct.createDetail({ detail: textFields[i]});
        }

        // await db.Image.destroy({
        //     where: {
        //         product_id: req.params.id
        //     }
        // })

        let images = [];
        for(let i = 0; i < req.files.length; i++){
            images.push(req.files[i].filename);
        }
        for(let i = 0; i < images.length; i++){
            await editProduct.createImage({ name: images[i] });
        }
        return res.redirect('detail/' + id);
    },

    destroy: async (req, res) => {
        // let id = req.params.id;

        // const product = await db.Products.findByPk(id);
        
        // await product.removeImages([id]);
        // await product.removeDetail([id]);
        // await db.Products.destroy({
        //     where: {
        //         id: id
        //     }
        // })

        // return res.redirect('list');


        let id = req.params.id;

        // let delimg = db.Image.destroy({
        //     where:{
        //         product_id: id
        //     }
        // })
        // let delDetail = db.Detail.destroy({
        //     where: {
        //         product_id: id
        //     }
        // })
        let delProd = db.Products.destroy({
            where:{
                id: id
            }
        })
        Promise.all([delimg, delProd, delDetail])
        .then(()=> res.redirect('list'))
        
    }
}

module.exports = productController;