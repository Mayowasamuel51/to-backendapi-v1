const coursemodel = require('../model/courses/coursemodel');

const postContent = (req, res, next) => {
    const { price, detailFirst, detailSecond, what_to_learn, courseName, courseHeader } = req.body 
    
    const post = new coursemodel({
        price: price,
        detailFirst: detailFirst,
        detailSecond: detailSecond,
        what_to_learn: what_to_learn,
        courseHeader: courseHeader,
        courseName:courseName
    })
    post.save().then((result) => {
        res.status(200).json({
        course:result
        })
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}
const getCourse = (req, res, next) => {
    coursemodel.find().then((result) => {
        res.status(200).json({
            course:result
        })
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        
    })

    
}
module.exports = {
    postContent,
    getCourse
}