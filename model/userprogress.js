const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  courseId: { type: String, required: true },
  classId: { type: String, required: true },
  note: { type: String, default: "" },
  time: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

userProgressSchema.index({ email: 1, courseId: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model("UserProgress", userProgressSchema);