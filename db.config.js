const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('commerce', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize