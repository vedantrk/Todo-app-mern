import React, { useState } from 'react';
import axios from 'axios'
import { postTodo } from '../state/todoSlicer';
import { useDispatch } from 'react-redux';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.post(
        `https://todo-app-mern-aibj.onrender.com/todo/data`,
        { text },
        { withCredentials: true }
      );
      console.log(response.data)
      dispatch(postTodo(response.data))
      setText("");
    }
    catch(error) {
      console.log(error)
    }
  }
  
  return (
    <div className=''>
      <form onSubmit={submitForm} className='flex justify-between mx-auto gap-3 p-4'>
        <input value={text} onChange={(e) => setText(e.target.value)} className='w-full border-2 border-gray-200 focus:outline-none focus:ring focus:border-blue-200 p-2 pl-3 rounded-md' type='text' placeholder='Add new todo...'/>
        <button type='submit' className='bg-blue-600 p-2 rounded-md px-4 text-white cursor-pointer font-bold '>Add</button>
      </form>
    </div>
  );
}

export default TodoForm;
