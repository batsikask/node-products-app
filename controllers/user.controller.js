const User = require('../models/user.model');

exports.findAll = async (req, res) => {
    console.log("Find all users");
    try {
        const result = await User.find();
        res.status(200).json({data: result});
    } catch (err) {
        console.log(`Problem in reading users, ${err}`);
    }

}

exports.findOne = async (req, res) => {
    console.log("Find a user");
    const username = req.params.username;
    try {
        const result = await User.findOne({username: username});
        res.status(200).json({data: result});
    } catch (err) {
        console.log(`Problem in reading users, ${err}`);
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
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })
    try {
        const result = await newUser.save()
        res.status(200).json({data: result})
        console.log("User inserted")
    } catch (err) {
        res.status(400).json({data: err})
        console.log(`Problem in creating user, ${err}`)
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
        console.log("User updated")
    } catch (err) {
        res.status(400).json({data: err})
        console.log(`Problem in updating user: ${err}`)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username
    console.log("Deleting user with username: ", username)
    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data: result})
        console.log("User deleted: ", username)
    } catch (err) {
        res.status(404).json({data: err})
        console.log(`Error in deleting user : ${username}`)
    }
}