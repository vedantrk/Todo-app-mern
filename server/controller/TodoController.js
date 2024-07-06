import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";

// get all Todos
export const getTodos = async (req, res) => {
  try {
    const todo = await Todo.find({ user: req.user.id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post todo
export const createTodos = async (req, res) => {
  try {
    const { text } = req.body;    
    const newtodo = await Todo.create({ user: req.user.id, text, done: false });
    // const savedTodo = await newtodo.save();
    await User.updateOne(
      { _id: req.user.id },
      { $push: { todos: newtodo._id } }
    );
    res.json(newtodo);
    
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if(todo){
      todo.done = !todo.done
    }
    // /await todo.save();
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  }
   catch (error) {
    res.status(404).json({ error:error.message });
  }
};
 
// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const {id} = req.params
    const todo = await Todo.findByIdAndDelete(id);
    await User.updateOne({ _id: req.user.id }, { $pull: { todos: todo._id } }); 
    res.json({ message: "Todo deleted" });
  }  
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};
