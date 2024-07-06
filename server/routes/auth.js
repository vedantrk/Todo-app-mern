import { register, login } from "../controller/AuthController.js";
import express from "express";
import User from "../models/userModel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post('/login', login);

router.get("/api/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Adjust according to your user model
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user, token: req.cookies.token });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});


export default router