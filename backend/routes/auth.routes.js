import express from "express";
import { login, logout, signup ,searchEmail, updateUserData} from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/searchEmail",searchEmail)
router.post("/updateUserData",updateUserData);


/*
// Define multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads"); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});

// Define multer upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed.'));
        }
        cb(null, true);
    }
}).single("mypic"); // Field name for the uploaded file

// Route handler for uploading profile picture
router.post("/uploadProfilePic", (req, res) => {
    // Call the upload middleware to handle file upload
    upload(req, res, function (err) {
        if (err) {
            // Handle Multer error
            return res.status(400).json({ error: err.message });
        }
        // Call the controller function to handle the uploaded file
        uploadProfilePic(req, res);
    });
});*/


export default router;
