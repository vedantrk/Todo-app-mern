import { createSlice } from "@reduxjs/toolkit";

const todoSlicer = createSlice({
  name: "todo",
  initialState: {
    user: null,
    token: null,
    todos: [],
    filter: "all",
  },

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      console.log(state.user)
    },

    getTodo: (state, action) => {
      state.todos = action.payload.map((item) => {
        return { id: item._id, text: item.text, done: item.done, createdAt: item.createdAt };
      });
      console.log("get reducer:"+state.todos)
    },

    postTodo: (state, action) => {
       const { _id, text, done, createdAt } = action.payload;
       state.todos.push({ id: _id, text, done, createdAt });
      console.log(" post Reducer dispatched:");
    },

    doneTodo: (state, action) => {
      const {id} = action.payload;
      console.log("done Reducer dispatched:"+id)
      const todo = state.todos.find((item) => item.id === id)
      if(todo) {
        todo.done = !todo.done
      }   
    },

    deleteTodo: (state, action) => {
      const {id} = action.payload;
      console.log("delete Reducer dispatched:" + id);
      state.todos = state.todos.filter((item) => item.id !== id);           
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { getTodo, postTodo, doneTodo, deleteTodo, setFilter, setLogin, setLogout } = todoSlicer.actions;
export default todoSlicer.reducer;