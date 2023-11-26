const admin = require('../firebase')
const jwt = require('jsonwebtoken');


const Authmiddleware = (req, res, next) => {
    const authH = req.get('Authorization');
    if (!authH) {
        const error = new Error('NOR AUTHENTICATICED');
        error.statusCode = 401;
        throw error;
    }
    const token = authH.split(' ')[1];
    let decodeToken;
    let decodeValue;
    try {
        decodeToken = jwt.verify(token, 'sfcdhbvdhs vsdvjsvsvvd')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodeToken) {
        const error = new Error("not allowed ");
        error.statusCode = 401;
        throw error
    }
    req.userId = decodeToken.userId
    next();
}

module.exports = {
    Authmiddleware
}