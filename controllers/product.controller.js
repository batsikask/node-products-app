const Product = require('../models/product.model')
const logger = require('../logger/logger');


exports.findAll = async (req, res) => {
    console.log("Find all products")
    try {
        const result = await Product.find();
        res.status(200).json({data: result});
        logger.debug("Success in fetching all products")
    } catch (err) {
        logger.error(`Error while fetching all products -- ${err}`)
    }
}

exports.findOne = async (req, res) => {
    console.log("Find a product")
    const id = req.params.id
    try {
        const result = Products.findOne({_id: id})
        logger.debug(`Found a product: ${result}`)
    } catch (err) {
        logger.error(`Error while fetching a product -- ${err}`)
    }
}

exports.create = async (req, res) => {
    console.log("Insert a product")
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    try {
        const result = await newUser.save()
        res.status(200).json({data: result})
        logger.debug(`Product inserted -- ${newProduct}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while inserting a product -- ${err}`)
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    console.log("Updating product with id: ", id)
    const updateProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    try {
        const result = await updateProduct.findOneAndUpdate(
            {_id: id}, updateProduct, {new: true}
        )
        res.status(200).json({data: result})
        logger.debug(`Updated product: ${updateProduct}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while update a product -- ${err}`)
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id
    console.log(`Deleting product with id: , ${id}`)
    try {
        const result = await User.findOneAndDelete({_id: id})
        res.status(200).json({data: result})
        logger.debug(`Product deleted, ID: ${id} `)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while deleting a user -- ${err}`)
    }
}