module.exports = (sequelize, DataTypes) => {
    let alias = "Image";
    let cols ={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "image"
    };

    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        Image.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'
        })
    }
    return Image;
}