const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const {body} = require('express-validator')
const User = require('../model/user')
const Middleware = require('../middleware/is-auth')
const QuizResult = require('../model/quiz.js')
const Quiz = require("../model/quiz.js");

// Get all quizzes for dropdown
router.get("/quiz/list", async (req, res) => {
  try {
    const quizzes = await Quiz.Quiz.find({}, "title description");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific quiz by ID
router.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Save quiz score
// router.post("/save", async (req, res) => {
//   try {
//     const { username, testName, score } = req.body;

//     if (!username || !testName || score === undefined)
//       return res.status(400).json({ message: "Missing fields" });

//     const result = await QuizResult.create({ username, testName, score });

//     res.status(201).json({ message: "Score saved successfully", result });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });
// Save quiz score
// router.post("/save", async (req, res) => {
//   try {
//     const { username, testName, score, totalQuestions } = req.body;

//     if (!username || !testName || score === undefined || !totalQuestions)
//       return res.status(400).json({ message: "Missing fields" });

//     const result = await QuizResult.create({
//       username,
//       testName,
//       score,
//       totalQuestions,
//       dateTaken: new Date(),
//     });

//     res.status(201).json({ message: "Score saved successfully", result });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


// router.get("/quiz/my-scores/:username", async (req, res) => {
//   try {
//     const results = await QuizResult.find({ username: req.params.username }).sort({ dateTaken: -1 });
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// router.get("/quiz/my-scores/:username", async (req, res) => {
//   try {
//     const { username } = req.params;

//     if (!username)
//       return res.status(400).json({ message: "Username is required" });

//     const results = await QuizResult.find({ username }).sort({ dateTaken: -1 });

//     if (results.length === 0)
//       return res.status(404).json({ message: "No test scores found" });

//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });
// google token from firebase, and we jwt token from our own server 
//procted
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password/:token', authController.resetPassword)


router.get('/users',
    // Middleware.mixMiddleware,
    // (req, res) => {
    // res.status(200).json("sdafafafafafaf")
    authController.userInfo)
    
router.post('/sighup', [
    body('email').isEmail().withMessage('please enter a vilad email').custom((value, { req }) => {
        return User.findOne({ email: req.email}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email already taken')
            }
        })
    }).normalizeEmail(),
    
    body('password').trim(),
    body('name').notEmpty().withMessage('please enter a vilad email').custom((value, { req }) => {
        return User.findOne({ name: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('name already taken')
            }
        })
    })
], authController.signup);

router.post('/login', authController.login)

router.post('/google', [
    body('email').isEmail().withMessage('please enter a vilad email').custom((value, { req }) => {
    return User.findOne({ email: req.email}).then(userDoc => {
        if (userDoc) {
            return Promise.reject('Email already taken')
        }
    })
}).normalizeEmail(),
], authController.googleAuth)


module.exports = router