const User = require('../models/user.model')

exports.findAll = async(req, res) => {
    console.log("Find all user's products")

    try {
        const result = await User.find({}, {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result})
        console.log("Reading all users products")
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Problem in reading user's products")
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username
    console.log('Find products for user: ', username)

    try {
        const result = await User.findOne({username: username}, {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result})
        console.log("Success in finding products for user: ", username)
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Problem in reading user's products")
    }
}

exports.create = async(req, res) => {
    const username = req.body.username
    const products = req.body.products
    console.log("Inserting products for user: ", username)

    try {
        const result = await User.updateOne(
            {username: username},
            {$push : {
                products: products
            }}
        )
        res.status(200).json({data: result})
        console.log("Inserting products to user succesfull")
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Problem in inserting user's products")
    }
}

exports.update = async (req, res) => {
    const username = req.params.username
    const _id = req.body.product._id
    const quantity = req.body.product.quantity
    console.log("Update product for username: ", username)

    try {
        const result = await User.updateOne(
            {username: username, "products._id": _id},
            {
                $set: {
                    "products.$.quantity": quantity
                }
            }
        )
        res.status(200).json({data: result})
        console.log("Successs in updating product ", username)
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Problem in updating product ", username)
    }
}

exports.delete = async (req, res) => {
    const username = req.params.username
    const _id = req.params.id
    
    console.log("Delete product")

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $pull: {
                    products: {_id: _id}
                }
            }
        )
        console.log("Success in deleting product: ", username)
        res.status(200).json({data: result})
    } catch (err) {
        res.status(400).json({data: result})
        console.log("Problem in deleting product: ", username)
    }
}