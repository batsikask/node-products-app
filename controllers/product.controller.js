const Product = require('../models/product.model')
const logger = require('../logger/logger');


exports.findAll = async (req, res) => {
    console.log("Find all products")
    try {
        const result = await Product.find();
        res.status(200).json({data: result});
        logger.debug("Success in fetching all products")
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while fetching all products -- ${err}`)
    }
}

exports.findOne = async (req, res) => {
    console.log("Find a product")
    const product = req.params.product
    try {
        const result = await Product.findOne({product: product})
        logger.debug(`Found a product: ${result}`)
    } catch (err) {
        res.status(404).json({data: err})
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
        const result = await newProduct.save()
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
    const product = req.params.product
    console.log("Deleting product: " + product)
    try {
        const result = await Product.findOneAndDelete({product: product})
        res.status(200).json({data: result})
        logger.debug(`Product deleted: ${product} `)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while deleting a product -- ${err}`)
    }
}