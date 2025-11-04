const Assingment = require('../model/assingment.js');
const User = require("../model/user.js")


const Sendassignment = async (req, res, next) => {
  const { assignment } = req.body;

  try {
    const newAssignment = await Assingment.create({
      message: assignment,
    });

    res.status(200).json({
      assignment: newAssignment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.error(err.message);
    next(err);
  }
};


const getassignment = async (req, res, next) => {
    try {
        // get the lastest message from the database !!!!!!
        const response = await  Assingment.find().sort({ $natural: -1 }).limit(1)
        res.status(200).json({
            data: response
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}




// const allAssignments = async (req, res, next) => {
//   try {
//     // get all assignments, sorted by newest first
//     const response = await  Assingment.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: response.length,
//       data: response,
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     console.error(err.message);
//     next(err);
//   }
// };

const allAssignments = async (req, res, next) => {
  try {
    // ✅ Fetch all assignments (newest first)
    const assignments = await Assingment.find().sort({ createdAt: -1 });

    // ✅ Send JSON response
    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (err) {
    console.error("Error fetching assignments:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching assignments",
    });
  }
};

module.exports = allAssignments;


module.exports= {
    allAssignments ,
    Sendassignment,
    getassignment
}