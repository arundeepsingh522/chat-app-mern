import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import fs from "fs";
import multer from "multer";
import cors from 'cors'
app.use(cors())


const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

const uploadsDir = path.join("uploads");
console.log("==>>>>",uploadsDir)

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("==>>>>",uploadsDir)
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|mp4|avi|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
//10 mb max file size
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.post("/upload", upload.single("myFile"), (req, res) => {
  try {
    console.log("cominggggggg")
    const filePath = `http://localhost:5000/uploads/${req.file.filename}`
    console.log("==>>>>",filePath)
    res.status(200).json({
      message: "File uploaded successfully ok",
      filePath: filePath,
    });

    console.log("filePath", filePath);
  } catch (error) {
    res.status(400).send("Error uploading file", error.message);
  }
});
app.post("/upload-multiple", upload.array("myFiles", 5), (req, res) => {
  try {
    res.send("Files uploaded successfully new");
    console.log("Files uploaded successfully");
  } catch (error) {
    res.status(400).send("Error uploading files");
  }
});
app.use("/uploads", express.static("uploads"));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// CORS middleware
app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)



// Use the image routes

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.post("/check", (req, res) => {
  console.log("check req", req.name);
  res.status(200).json({ message: "Logged out successfully" });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
