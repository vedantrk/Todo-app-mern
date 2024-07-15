import express from "express";
import {
  getTodos,
  createTodos,
  updateTodo,
  deleteTodo,
} from "../controller/TodoController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// get all Todos
router.get("/data", verifyToken, getTodos);

// post Todos
router.post("/data", verifyToken, createTodos);

// update Todo
router.patch("/data/update/:id", verifyToken, updateTodo);

//delete Todo
router.delete("/data/delete/:id", verifyToken, deleteTodo);

export default router;
