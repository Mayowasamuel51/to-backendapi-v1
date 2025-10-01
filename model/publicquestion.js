const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicQuestionSchema = new Schema({
  name: {
    type: String,
    default: "Anonymous", // fallback if no user
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String, // will store uploaded file URL
  },
});

module.exports = mongoose.model('PublicQuestion', PublicQuestionSchema);
