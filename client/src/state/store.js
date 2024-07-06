import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlicer'

const store = configureStore({
    reducer: {
        todos: todoReducer, // assign reducer
    }
})

export default store;
