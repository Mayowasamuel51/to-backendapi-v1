const { validationResult } = require("express-validator");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const Payment = require("../model/payment.js");
const LiveCourse = require("../model/livecourses.js");
const Comment = require("../model/comment.js");
const Link_splunk = require("../model/Link_splunk.js");
const Link_educational = require("../model/link_eductional.js");
const myLearning = (req, res, next) => {
  res.status(200).json("i can see me now");
};

const info = async (req, res, next) => {
  // getting the user name and other info by token or name
  const { email } = req.body;
  try {
    const userinfo = await User.findOne({ email: email });
  } catch (err) {}
};
const allPayment = async (req, res) => {
  try {
    const response = await Payment.find().sort({ $natural: -1 });
    res.status(201).json({
      data: response,
      message: "is done well!!!!!!",
    });
  } catch (err) {}
};
const createOrder = async (req, res, next) => {
  const { studentName, courseName, payment_mode, payment_id, price } = req.body;
  try {
    const paymentuser = await Payment.create({
      studentName: studentName,
      courseName: courseName,
      payment_id: payment_id,
      payment_mode: payment_mode,
      price: price,
    });
    res.status(201).json({
      data: paymentuser,
      message: "is done well!!!!!!",
    });
    console.log(paymentuser);
  } catch (err) {
    
  }
};

/// getting comment from studnet
const commentPost = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const response = await Comment.create({
      message: comment,
    });
    res.status(201).json({
      response: response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};
// getting all comment from stundent to be show on the admin dashboard
const commentGet = async (req, res, next) => {
  try {
    // get the lastest message from the database !!!!!!
    const response = await Comment.find().sort({ $natural: -1 }).limit(200);
    res.status(200).json({
      response: response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};

// get amount of people who paid for splunk!!!
const getSplunkUsers = async (req, res, next) => {
  try {
    const courses = await Payment.find({
      courseName: { $regex: /splunk/i },
    }).countDocuments();
    res.status(201).json({ message: "repsone", response: courses });
    // return res.status(200).json({message:"",})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};
// get amount of people who paid for Educational!!!
const getEducationalUsers = async (req, res, next) => {
  try {
    const courses = await Payment.find({
      courseName: { $regex: /Educational Consulting/i },
    }).countDocuments();
    res.status(201).json({ message: "repsone", response: courses });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};
/* A  function  called sendliveCoursesSplunk for sending live google meet to student for meet up ,live courses are Splunk , Educational
this function will only work for auth users and paid course users (Splunk, and Educational )
*/
const sendliveCoursesSplunk = async (req, res, next) => {
  // if student has paid for splunk  courses then the admin should see total of student they are sending link to else  the input in the frontend shoulb blur or something
  try {
    const { email, link } = req.body;

    /// know who paid for live splunk from payment database
    /// send link to who paid for splunk
    // finding or searching for letters of splunk in the database;

    // Fetch out courseNames first with studnet email who paid
    // After fetching those that paid then send link to them
    // So send to the paid student email

    const courses = await Payment.find({
      courseName: { $regex: /splunk/i },
    });

    if (courses) {
      // insert the links into the link database .
      // then the paid studnet will access it
      // store payment names into the array
      const mainnames = courses.map((names) => {
        console.log(names.studentName);
        return names.studentName;
      });
      const createLinks = await Link_splunk.create({
        email: mainnames,
        link: link,
      });
      return res.status(201).json({ message: "repsone", data: createLinks });
      // return res.status(200).json({message:"",})
    } else {
      return res.status(200).json({ message: "ERROR" });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};

const sendliveCoursesEducation = async (req, res, next) => {
  // if student has paid for Educational  courses then the admin should see total of student they are sending link to else  the input in the frontend shoulb blur or something
  try {
    const { email, link } = req.body;

    /// know who paid for live Educational from payment database
    /// send link to who paid for Educational
    // finding or searching for letters of Educational in the database;

    // Fetch out courseNames first with studnet email who paid
    // After fetching those that paid then send link to them
    // So send to the paid student email

    const courses = await Payment.find({
      courseName: { $regex: /Educational Consulting/i },
    });

    if (courses) {
      // insert the links into the link database .
      // then the paid studnet will access it
      // store payment names into the array
      const mainnames = courses.map((names) => {
        console.log(names.studentName);
        return names.studentName;
      });
      const createLinks = await Link_educational.create({
        email: mainnames,
        link: link,
      
      });
      console.log(createLinks)
      return res.status(201).json({ message: "repsone", data: createLinks });
      // return res.status(200).json({message:"",})
    } else {
      return res.status(200).json({ message: "ERROR" });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};

// A functiom called getLink perform a task of sending link to live courses paid user will be working with the payment database to check if they have paid
const getLink = async (req, res, next) => {
  // send link to paid live courses for splunks to their eamil point to their email!!!!!!
  try {
    const email = req.params.email;
    console.log(email);
    const linking = await Link_splunk.findOne({ email: email });
    // const
    // courses =
    //  await Payment.find({
    //     courseName: { $regex: /splunk/i },
    //   });

    if (!linking) {
      const error = new Error("sorry you didnt subscribe for the course ");
      error.statusCode = 404;
      throw error;
    }
    const sendlink =
      // await Link_splunk.find({ link: { $eq: "link" } });
      await Link_splunk.find().sort({ $natural: -1 }).limit(1);
    res.status(200).json({
      response: sendlink,
    });
    console.log(linking);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};
// console.log(sendliveCoursesSplunk())
const getLinkEducation = async (req, res, next) => {
  // send link to paid live courses for Educational to their eamil point to their email!!!!!!
  try {
    const email = req.params.email;
    console.log(email);
    const linking = await Link_educational.findOne({ email: email });
    
    if (!linking) {
      const error = new Error("sorry you didnt subscribe for the course ");
      error.statusCode = 404;
      throw error;
    }
    const sendlink =
      // await Link_splunk.find({ link: { $eq: "link" } });
      await Link_educational.find().sort({ $natural: -1 }).limit(1);
    res.status(200).json({
      response: sendlink,
    });
    console.log(linking);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    console.log(err.message);
  }
};
module.exports = {
  getEducationalUsers,
  getLinkEducation,
  getSplunkUsers,
  getLink,
  allPayment,
  commentGet,
  commentPost,
  sendliveCoursesSplunk,
  sendliveCoursesEducation,
  createOrder,
  myLearning,
};
// let paidLiveCourses = user.courseName;
// let links = [];
// for (let i = 0; i < paidLiveCourses.length; i++) {
//   res.status(200).json({
//     response: courseName[i],
//   });
//   console.log(courseName[i]);
// }
