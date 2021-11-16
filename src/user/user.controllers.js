const User = require("./user.model")

exports.addUser = async (req,res) => {
    try {
        const newUser = new User(req.body)
        const token = await newUser.generateAuthToken()
        await newUser.save();
        res.status(200).send({message: "Success", newUser, token})
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "something went wrong, check server logs"})
    }
}

exports.find = async (req,res) => {
    try {
        const data = await User.find(req.body)
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "something went wrong, check server logs"})
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const userToDelete = await User.deleteOne(req.body)
        res.status(200).send(`${userToDelete} has been deleted.`)
    } catch (err){
        console.log(err)
        res.status(500).send({message: "something went wrong, check the server logs"})
    }
}

exports.updateItem = async (req,res) => {
    try {
        await User.where().update()
    } catch (err){
        console.log(err)
        res.status(500).send({message: "something went wrong, check the server logs"})
    }
}

exports.login = async (req,res) => {
    try {
        const token = await req.user.generateAuthToken()
        res.status(200).send({user: req.user, token})
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "failed login"})
    }
}