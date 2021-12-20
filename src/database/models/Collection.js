module.exports = (sequelize, DataTypes) => {
    let alias =  "Collection";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "collection",
        timeStamps: false
    };

    const Collection = sequelize.define(alias, cols, config);

    Collection.associate = (models) => {
        Collection.hasMany(models.Products, {
            as: "products",
            foreignKey: "collection_id"
        });
    };
    return Collection;
}