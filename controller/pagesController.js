const Contact = require('../model/contact.js');

const contact = async (req, res, next) => {
    // const { name, email, number, message } = req.body;
    try {
        const { name, email, number, message } = req.body;
        if (!name || !email || !number || !message) {
            return res.status(401).json({ message: 'input is empty!!!' })
        }
        const response = await Contact.create({
            name: name,
            number: number,
            message: message,
            email: email
        })
        res.status(201).json({
            data: response,
            message: "created"
        })
        console.log(response)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}


const getcontact = async (req, res, next) => {
    try {
        const response = await Contact.find();
        res.status(200).json({
            data: response,
            message: "all contact's"
        })
        console.log(response)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
module.exports = {
    contact,
    getcontact
}