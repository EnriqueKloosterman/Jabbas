module.exports = (sequelize, DataTypes) => {
    let alias = "Detail";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        detail: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "detail"
    };

    const Detail = sequelize.define(alias, cols, config);

    Detail.associate = (models) => {
        Detail.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'
        })
    }
    return Detail;
}