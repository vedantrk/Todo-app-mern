import React from 'react';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center h-full">
        <div className="max-w-[1100px] m-4 sm:w-[600px] md:w-[700px] lg:w-[900px] p-4  rounded-lg ">
          <h1 className="text-center font-bold text-gray-800 text-5xl md:text-6xl lg:text-7xl p-2 mb-2">
            My Todos
          </h1>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
