const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path')



const mainController = {
    index: async (req, res) => {
        let featuredProducts = await db.Products.findAll({
            include: ["image", "type", "brand"],
            limit: 4,
            where: {
                type_id: 3
            }
            
        })
        let onSale = await db.Products.findAll({
            include: ["image", "type", "brand"],
            limit: 4,
            where: {
                type_id: 1
            }
        })

        .catch((e) => {console.log(e) })

        
        return res.render('index', {featuredProducts, onSale,
            title: "Jabba´s Palace", 
            style: "/css/home.css"})
    }
}


module.exports = mainController;