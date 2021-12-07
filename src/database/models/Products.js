module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        discount: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'products'
    }; 

    const Products = sequelize.define(alias, cols, config);

    Products.associate = models => {
        Products.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id",
        });
        Products.belongsTo(models.Collection, {
            as: "collection",
            foreignKey: "collection_id"
        });
        Products.belongsTo(models.Type, {
            as: "type",
            foreignKey: "type_id"
        });
        Products.hasMany(models.Image, {
            as: "image",
            foreignKey: "product_id"
        });
    }
    return Products;
}