import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config()

export const register = async (req, res) => {
  try {
    const { uname, password, todos } = req.body;
    console.log(req.body);

    const exist = await User.findOne({ uname });
    if (exist) {
      return res.status(400).json({ message: "Username already in use." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = User.create({
      uname,
      password: passwordHash,
      todos,
    });

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
    res.status(201).json(newUser,{message: 'User registered successfully.'});
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { uname, password } = req.body;

    const user = await User.findOne({ uname });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.cookie("token", token); // , {httpOnly: true, secure: true, sameSite: 'strict'}
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
