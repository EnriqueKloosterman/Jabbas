module.exports = (sequelize, DataTypes) =>{
    let alias = "Brand";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config ={
        tableName: "brand",
        createdAt: "craetedAt"
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models) => {
        Brand.hasMany(models.Products, {
            as: "products",
            foreignKey: "brand_id"
        });
    };
    return Brand;
}