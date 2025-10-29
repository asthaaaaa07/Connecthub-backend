import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 
const allowedOrigins = [
  "http://localhost:5173", 
  "https://connecthub.netlify.app", 
];

app.use(
  cors({
    origin: (origin, callback) => {
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors());

app.use(express.json({ limit: "10mb" })); 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 


app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "🚀 ConnectHub backend running fine!" });
});

// ✅ Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Database + Server start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 ConnectHub backend running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
