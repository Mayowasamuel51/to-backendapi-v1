const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const admin = require('../firebase');

const signup = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // const error = new Error("vaildation failed data please fill up!!!!!")
        const error = new Error("Account already existing!!!!!")
        error.statusCode = 422;
        throw error
    }
    const { email, name, password } = req.body;
    // check if user exist first 

    const token = jwt.sign({ email: email }, 'sfcdhbvdhs vsdvjsvsvvd', {
        expiresIn: '1h'
    })

    bcrypt.hash(password, 12).then(hased => {
        const user = new User({
            name: name,
            email: email,
            provider:"email and password",
            password: hased
        })
        user.save().then((result) => {
            res.status(201).json({
                massage: 'user enter',
                data: result,
                token,
                email: email,
            })
            console.log(result)
            console.log('welcome to To!!!!!!!!!!!!!!!!!!!!!')
        })
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    })

}


const login = (req, res, next) => {
    // check vaildation
    // check if user exist 
    // check for token
    const { email, password } = req.body;
    let loadedUser;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            const error = new Error("Login error: Verify your email and password or create an account");
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    }).then(isEqaul => {
        if (!isEqaul) {
            const error = new Error("Password unrecognized. Retry or reset your password!!!");
            error.statusCode = 403;
            throw error;
        }
        const token = jwt.sign({ email: loadedUser.email, userId: loadedUser._id.toString() },
            'sfcdhbvdhs vsdvjsvsvvd', {
            expiresIn: '1h'
        })
        res.status(200).json({
            message: 'welcome',
            token: token,
            email: loadedUser.email,
            data: loadedUser
        })

    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    })
}


const userInfo = async (req, res, next) => {
    // this function will return the user login info for both google auth and jwt
    const token = req.headers.authorization.split(' ')[1]
    let decodeToken;
    let decodeValue;
    try {
        decodeToken = jwt.verify(token, 'sfcdhbvdhs vsdvjsvsvvd')
        console.log(decodeToken)
        return res.status(200).json({
            token: decodeToken
        })
    } catch (err) {
        try {
            //firebase auth admin
            decodeValue = await admin.auth().verifyIdToken(token);
            console.log(decodeValue)
            if (decodeValue) {
                return res.status(200).json({
                    token: decodeValue
                })
            }
            return res.json({ message: "un Authorization by users" })
        } catch (err) {
            console.log("error for admin google", err.message)
        }
        err.statusCode = 500;
        throw err;
    }

}

const googleAuth = async (req, res, next) => {
    /// storing only google users
    try {
        const { name, email } = req.body;
        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Existing user found, log in and return token
            const token = jwt.sign({ email, userId: existingUser._id.toString() },
                process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for JWT secret
            console.log(`User already exists: ${existingUser._id}`);
            return res.status(200).json({
                email: email,
                response: existingUser,
                token: token,
                provider: "google"
            });

        }

        // New user - create with provided name and email
        const createdUser = await User.create({ name, email ,provider:"google"});
        console.log(`New user created: ${createdUser._id}`);

        // Generate and return token for new user
        const token = jwt.sign({ email: createdUser.email, userId: createdUser._id.toString() },
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            email: createdUser.email,
            response: createdUser,
            token,

        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        console.error(err.message);
    }
}

module.exports = {
    googleAuth,
    signup,
    login,
    userInfo
}





// try {
//     // i want the token then the users infomation and display the name or gmail;
//     const token = req.headers.authorization.split(' ')[1];
//     const googlefirebasetoken = await admin.auth().verifyIdToken(token);
//     const jwttoken = jwt.verify(token, 'sfcdhbvdhs vsdvjsvsvvd');

//     if (googlefirebasetoken.firebase.identities === "google.com") {
//         res.status(200).json({
//             firebase: googlefirebasetoken
//         })
//         next()
//     }
//     else  if(jwttoken){

//         return res.status(200).json({
//             jwt_token: jwttoken,
//         })
//     }







// } catch (err) {
//     if (!err.statusCode) {
//         err.statusCode = 500;
//     }
//     next(err)
//     console.log(err.message)
// }