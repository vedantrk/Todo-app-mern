import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import todoRoutes from "./routes/todo.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
app.use(
  cors({
    origin:['http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())

app.use("/", authRoutes);

app.use("/todo", todoRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serve running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error! ", error.message);
  });
