const Contact = require('../model/contact.js');
const Contractors = require('../model/contractors.js')
const User = require("../model/user.js")
const Message = require('../model/messages');

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
        const response = await Contact.find().sort({ $natural: -1 }).limit(60)
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
const sendMessage = async (req, res, next) => {
    const { messages } = req.body;

    try {
        const message = await Message.create({
            message: messages
        })
        res.status(200).json({
            messages: message
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
const getMessage = async (req, res, next) => {
    try {
        // get the lastest message from the database !!!!!!
        const response = await Message.find().sort({ $natural: -1 }).limit(1)
        res.status(200).json({
            messages: response
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
const postContractors = async (req, res, next) => {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     const error = new Error("Account already existing!!!!!")
    //     error.statusCode = 422;
    //     throw error
    // }
    /// uploading files to the backend     
    try {
        const { name, email, role_postion, link_portfolio, number, pdfurl } = req.body;
        const response = await Contractors.create({
            name: name,
            email: email,
            role_postion: role_postion,
            link_portfolio: link_portfolio,
            number: number,
            pdfurl:pdfurl,
        })
        res.status(201).json({
            response: response,
            message:"create contractors"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }

}
const getContractors = async  (req,res,next) => {
    try {
        const response = await Contractors.find().sort({ $natural: -1 }).limit(30)
        res.status(200).json({
            response: response,
            message:"successfull"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
        console.log(err.message)
    }
}
const showStudent = async (req, res, next) => {
    // showing all student  with jwt and google ones
    // show name, email  createdAt
    try {
        const response = await User.find().select("-password")
            .sort({ $natural: -1 }).limit(60)
            // .distinct('email')
        res.status(200).json({
            response:response
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
const totalStudent = async (req,res,next) => {
    // getting all students in terms of numbers 
    try {
        const response = await User.countDocuments()
        res.status(200).json({
            response:response
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
    
}
module.exports = {
    totalStudent,
    showStudent,
    getContractors,
    postContractors,
    contact,
    sendMessage,
    getMessage,
    getcontact
}