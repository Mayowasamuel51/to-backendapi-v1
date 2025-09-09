const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true }, // path to file in uploads
  fileType: { type: String, enum: ["pdf", "ppt", "pptx"], required: true },
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin
  uploadedAt: { type: Date, default: Date.now },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Link_splunk" }, // optional
});

module.exports = mongoose.model("File", fileSchema);
