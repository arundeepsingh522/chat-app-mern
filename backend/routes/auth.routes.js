import express from "express";
import { login, logout, signup ,searchEmail, updateUserData} from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/searchEmail",searchEmail)
router.post("/updateUserData",updateUserData);
export default router;
