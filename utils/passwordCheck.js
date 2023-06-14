const bcrypt = require('bcrypt')
const usersModel = require('../models/users')

const passwordCheck = async (Name, Password) => {
    const userData = await usersModel.findOne({where: {Name: Name}})
    const compare = await bcrypt.compare(Password, userData.Password)
    return { userData, compare }
}


module.exports = passwordCheck