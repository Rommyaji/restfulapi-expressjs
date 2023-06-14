const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')
class Product extends Model { }

Product.init({
    ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product'
})


module.exports = Product