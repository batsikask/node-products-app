const User = require('../models/user.model');
const logger = require('../logger/logger')

exports.findAll = async (req, res) => {
    console.log("Find all users");
    try {
        const result = await User.find();
        res.status(200).json({data: result});
        logger.debug("Success in reading all users")
    } catch (err) {
        logger.error(`Error while fetching all users -- ${err}`)
    }

}

exports.findOne = async (req, res) => {
    console.log("Find a user");
    const username = req.params.username;
    try {
        const result = await User.findOne({username: username});
        res.status(200).json({data: result});
        logger.debug(`Found a user: ${result}`)
    } catch (err) {
        logger.error(`Error while fetching user -- ${err}`)
    }
}

exports.create = async (req, res) => {
    console.log("Insert a user")
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: {
            area: req.body.area,
            road: req.body.road
        },
        phone: req.body.phone,
        products: req.body.products
    })
    try {
        const result = await newUser.save()
        res.status(200).json({data: result})
        logger.debug(`User inserted -- ${newUser}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while inserting a user -- ${err}`)
    }
}

exports.update = async(req, res) => {
    const username = req.params.username
    console.log("Updating user with username: ", username)
    const updateUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    })
    try {
        const result = await User.findOneAndUpdate(
            {username: username}, updateUser,
            {new: true}
        )
        res.status(200).json({data: result})
        logger.debug(`Updated user: ${updateUser}`)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while updating a user -- ${err}`)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username
    console.log("Deleting user with username: ", username)
    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data: result})
        logger.debug(`User deleted -- ${username}`)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while deleting a user -- ${err}`)
    }
}