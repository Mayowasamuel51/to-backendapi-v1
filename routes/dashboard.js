// this is the protected routes  for auth users
const express = require("express");
const router = express.Router();
const dashboard = require("../controller/DashboardController.js");
const auth = require("../middleware/is-auth.js");
const Middleware = require("../middleware/auth");

/// comment post
router.post("/comment", dashboard.commentPost);

// sending live google meet to paid users  Splunk  courses
router.post("/livesplunk", dashboard.sendliveCoursesSplunk);

// sending live google meet to paid users   of  Educational   courses
router.post("/liveseducation", dashboard.sendliveCoursesEducation);

// total splunk users
router.get(
  "/splunk",
  //  auth.Authmiddleware,
  dashboard.getSplunkUsers
);

// total educational users
router.get(
  "/educational",
  //    auth.Authmiddleware,
  dashboard.getEducationalUsers
);

/// student getting the links for splunk
router.get("/link/:email", auth.Authmiddleware, dashboard.getLink);

/// student getting the links for Educational
router.get(
  "/linkeducational/:email",
  auth.Authmiddleware,
  dashboard.getLinkEducation
);

/// middlware for both
router.get("/mylearning", auth.Authmiddleware, dashboard.myLearning);

// showing student the paid courses they bought
router.get(
  "/paidcourses/:email",
  // auth.Authmiddleware,
  dashboard.showPaidCourses
);

router.post("/order", dashboard.createOrder);
router.get("/order", dashboard.allPayment);

module.exports = router;
