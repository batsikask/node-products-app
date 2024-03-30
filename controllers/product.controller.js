const Product = require('../models/product.model')


exports.findAll = async (req, res) => {
    console.log("Find all products")
    try {
        const result = await Product.find();
        res.status(200).json({data: result});
    } catch (err) {
        console.log(`Problem in reading products, ${err}`)
    }
}

exports.findOne = async (req, res) => {
    console.log("Find a product")
    const id = req.params.id
    try {
        const result = Products.findOne({_id: id})
    } catch (err) {
        console.log(`Problem in reading products, ${err}`)
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
        console.log("Product inserted")
    } catch (err) {
        res.status(400).json({data: err})
        console.log(`Problem in creating product, ${err}`)
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    console.log(`Updating product with id: , ${id}`)
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
    } catch (err) {
        res.status(400).json({data: err})
        console.log(`Problem in updating product: ${err}`)
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id
    console.log(`Deleting product with id: , ${id}`)
    try {
        const result = await User.findOneAndDelete({_id: id})
        res.status(200).json({data: result})
        console.log(`Product deleted, ID: ${id}`)
    } catch (err) {
        res.status(400).json({data: err})
        console.log(`Error in deleted product with ID: ${id}`)
    }
}