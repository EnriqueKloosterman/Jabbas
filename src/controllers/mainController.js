const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path')



const mainController = {
    index: async (req, res) => {
        let featuredProducts = await db.Products.findAll({
            include: ["image", "type", "brand", "collection"],
            limit: 4,
            where: {
                type_id: 3
            }
            
        })
        let onSale = await db.Products.findAll({
            include: ["image", "type", "brand", "collection"],
            limit: 4,
            where: {
                type_id: 1
            }
        })
        let newArrivals = await db.Products.findAll({
            include: ["image", "type", "brand", "collection"],
            order: [['id', 'DESC']],
            limit: 4,
            
        })
        let collection = await db.Collection.findAll()

        .catch((e) => {console.log(e) })

        
        return res.render('index', {featuredProducts, onSale, newArrivals, collection,
            title: "Jabba´s Palace", 
            style: "/css/home.css"})
    }
}


module.exports = mainController;