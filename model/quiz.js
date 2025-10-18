const mongoose = require('mongoose')
const Schema = mongoose.Schema
const quizResultSchema = new Schema(
  {
    username: { type: String, required: true },
    testName: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    dateTaken: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// export default mongoose.model("QuizResult", quizResultSchema);
module.exports = mongoose.model('QuizResult',quizResultSchema)