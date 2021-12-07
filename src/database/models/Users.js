module.exports = (sequelize, DataTypes) => {
    let alias = "Users";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        lastName:{
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.INTEGER
        },
        role: {
            type: DataTypes.INTEGER
        }

    };
    
    let config = {
        tableName: "users"
    };

    const Users = sequelize.define(alias, cols, config);

    return Users;
}