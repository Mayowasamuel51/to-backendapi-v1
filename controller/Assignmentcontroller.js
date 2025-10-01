const Assingment = require('../model/assingment.js');
const User = require("../model/user.js")



const Sendassignment = async (req, res, next) => {
    const { assignment } = req.body;
    try {
        const assignment = await Assingment.create({
            assignment: assignment
        })
        res.status(200).json({
            assignment: assignment
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}
const getassignment = async (req, res, next) => {
    try {
        // get the lastest message from the database !!!!!!
        const response = await assignment.find().sort({ $natural: -1 }).limit(1)
        res.status(200).json({
            response: response
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}

module.exports= {
    Sendassignment,
    getassignment
}