const express = require('express')
const cors = require('cors')
const app = express()
const usersEndpoint = require('./routes/users')
const productEndpoint = require('./routes/product')

require('dotenv').config()


const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready'))

app.use(cors())
app.use(express.json())

app.use('/users', usersEndpoint)
app.use('/product', productEndpoint)

app.listen(process.env.PORT || 3200, () => console.log('Server running on port 3200'))
