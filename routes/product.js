const express = require('express')
const router = express.Router()
const productsModel = require('../models/product')
const { Op } = require('sequelize')


// get all products with pagination
router.get('/', async (req, res) => {

    const { page } = req.query 

    const limit = 4
        try {
            const totalCount = await productsModel.count()
            const totalPages = Math.ceil(totalCount / limit)
        
            const product = await productsModel.findAll({
                limit: limit,
                offset: (page -1) * limit
            })
            res.status(200).json({
                totalPages: totalPages,
                currentPage: page,
                data: product
            })
        } catch(err) {
            res.status(500).json({
                error: err.message
            })
        }
})

// get product by id
router.get('/productid/:id', async (req, res) => {
    
    const { id } = req.params
    
    try {
        const product = await productsModel.findOne({
            where: {ProductID: id}
        })
    
        res.status(200).json({
            data: product
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }

})

// get product by name
router.get('/search/:name', async (req, res) => {
    const { name } = req.params

    try {
        const product = await productsModel.findAll({
            where: {Name: {[Op.like]: `%${name}%` }}
        })
        res.status(200).json({
            data: product
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }
})



// add product
router.post('/', async (req, res) => {
    const { Name, Price, Stock, Description } = req.body

    try {
        const products = await productsModel.create({
            Name, Price, Stock, Description
        })
        res.status(200).json({
            data: products,
            metadata: "add product success"
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }
})


router.put('/', async (req, res) => {
    const { Name, newName, Price, Stock, Description } = req.body

    try {
        const products = await productsModel.update(
            { Name: newName, Price, Stock, Description },
            {where: {Name: Name}}
        )
        res.status(200).json({
            data: products,
            metadata: "product updated successfully"
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }
})


module.exports = router