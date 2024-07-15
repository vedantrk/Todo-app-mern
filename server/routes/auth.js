import { register, login } from "../controller/AuthController.js";
import express from "express";
import User from "../models/userModel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post('/login', login);

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});


export default router