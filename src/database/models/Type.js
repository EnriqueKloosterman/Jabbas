module.exports = (sequelize, DataTypes) => {
    let alias = "Type";

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

    let config = {
        tableName: "type",
        timetStamps: false
        
        
    };

    const Type = sequelize.define(alias, cols, config);

    Type.associate = (models) => {
        Type.hasMany(models.Products, {
            as: "type",
            foreignKey: "type_id"
        });
    };
    return Type;

}