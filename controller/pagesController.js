const Contact = require('../model/contact.js');

const contact = async (req, res) => {
    // const { name, email, number, message } = req.body;
    try {
        const { name, email, number, message } = req.body;
        if (!name || !email || !number || !message) {
            return res.status(401).json({message:'input is empty!!!'})
        }
        const response =   await Contact({
            name: name,
            number: number,
            message: message,
            email:email
        })

        res.status(201).json({
            data:response
        })


        
        
    } catch (err) {
        
    }
}
module.exports = {
    contact
}