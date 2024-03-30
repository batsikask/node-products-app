const logger = require('../logger/logger')
const User = require('../models/user.model')

exports.findAll = async(req, res) => {
    console.log("Find all users' products")

    try {
        const result = await User.find({}, {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result})
        logger.debug("Success in fetching all users' products")
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while fetching all users' products -- ${err}`)
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username
    console.log('Find products for user: ', username)

    try {
        const result = await User.findOne({username: username}, {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result})
        logger.debug(`Found products for user: ${username}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while fetching a user's products -- ${err}`)
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
        logger.debug(`Products: ${products} inserted to User: ${username}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while inserting products to a user -- ${err}`)
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
        logger.debug(`Updated quantity for product with ID: ${_id}, User: ${username} `)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while updating a product for User: ${username} -- ${err}`)
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
        logger.debug(`Deleted a product from User: ${username}`)
        res.status(200).json({data: result})
    } catch (err) {
        res.status(400).json({data: result})
        logger.error(`Error while deleting a product from User: ${username} -- ${err}`)
    }
}