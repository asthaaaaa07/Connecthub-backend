import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 🗂️ Ensure upload folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ⚙️ Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const upload = multer({ storage });

// 📤 Route to upload image
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

export default router;
