const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')
class User extends Model { }

User.init({
    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Users'
})


module.exports = User