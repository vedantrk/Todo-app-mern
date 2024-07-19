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
    origin: ["https://todo-app-mern-frontend-j32r.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
  console.log("Server running Successfully");
  res.send("Server running Successfully");
});

app.use("/api", authRoutes);

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
