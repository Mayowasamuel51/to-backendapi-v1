const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../model/file"); // your mongoose model
const router = express.Router();

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ✅ Upload file (Admin only)
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // const newFile = new File({
        //   title: req.body.title || req.file.originalname,
        //   description: req.body.description || "",
        //   fileUrl: `/uploads/${req.file.originalname}`,
        //   fileType: path.extname(req.file.originalname).slice(1), // pdf, ppt, pptx
        //   uploadedBy: req.user?.id, // from auth middleware (if you have)
        // });
        const newFile = new File({
            title: req.body.title || req.file.originalname,
            description: req.body.description || "",
            fileUrl: `/uploads/${req.file.filename}`,  // ✅ safer, unique name
            fileType: path.extname(req.file.originalname).slice(1), // pdf, ppt, pptx
            uploadedBy: req.user?.id, // from auth middleware if you use it
        });
        let why;

        await newFile.save();

        res.json({ message: "File uploaded successfully", file: newFile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Get all files (Student + Admin)
router.get("/files", async (req, res) => {
    try {
        const files = await File.find().sort({ uploadedAt: -1 });
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Get single file
router.get("/:id", async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Delete file (Admin only)
router.delete("/:id", async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json({ message: "File deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Update file metadata (Admin only)
router.put("/:id", async (req, res) => {
    try {
        const file = await File.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, description: req.body.description },
            { new: true }
        );
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
