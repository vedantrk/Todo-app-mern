import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getTodo, deleteTodo, doneTodo, setFilter } from "../state/todoSlicer";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos =  useSelector((state) => state.todos.todos ) // 1st todos = name of store, 2nd todos = data from initial state in createslice
  const filter = useSelector((state) => state.todos.filter);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/todo",{ withCredentials: true})
        dispatch(getTodo(response.data))        
      }
      catch(error) {
        console.error(error)
      }
    }
    getData();
  },[dispatch]);

  const handleDone = async (id) => {
    try {
      console.log('handledone :'+id)
      const response = await axios.patch(
        `http://localhost:3001/todo/update/${id}`,{}, { withCredentials: true}
      );
      dispatch(doneTodo({ id }));
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("handledelete :" + id);
      const response = await axios.delete(`http://localhost:3001/todo/delete/${id}`, { withCredentials: true});
      console.log("Response from delete API:", response.data);
      dispatch(deleteTodo({id}))
    }
    catch (error) {
      console.log(error)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.done;
    }
    if (filter === "pending") {
      return !todo.done;
    }
    return true; // 'all'
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
   };

  return (
    <div className="">
      <div className="px-4 pt-4 flex font-bold gap-1 md:gap-2 ">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className="w-[7rem] border-2 text-md text-white p-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:bg-black">
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("pending"))}
          className="w-[7rem] border-2 text-md text-white p-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:bg-black">
          Pending
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className="w-[7rem] border-2 text-md text-white p-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:bg-black">
          Completed
        </button>
      </div>
      <div className="p-4 my-2">
        {filteredTodos.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-2 border-gray-200 shadow-md rounded-md flex-column mb-2 py-3 px-2 text-xl bg-white">
            <div
              className={
                item.done
                  ? "capitalize text-2xl font-bold mx-2 line-through"
                  : "capitalize text-2xl font-bold mx-2 "
              }>
              {item.text}
              <p className="text-[12px] text-gray-600">
                {formatDate(item.createdAt)}
              </p>
            </div>

            <div className="mx-2 my-4 flex gap-2">
              <div onClick={() => handleDone(item.id)}>
                {item.done ? (
                  <IoClose
                    size={30}
                    className="bg-yellow-500 rounded-lg cursor-pointer text-white"
                  />
                ) : (
                  <MdDone
                    size={30}
                    className="bg-green-500 rounded-lg cursor-pointer text-white"
                  />
                )}
              </div>

              <div onClick={() => handleDelete(item.id)}>
                <MdDelete
                  size={30}
                  className="bg-red-500 rounded-lg text-white cursor-pointer p-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
