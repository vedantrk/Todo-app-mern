import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import todoimg from '../assets/todoimg.jpg'

const Register = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:3001/register", {
        uname,
        password,
      });
      console.log(response.data);

      if (response.status !== 200) {
        setError(response.data.error || "Registration failed");
      }
      setUname("");
      setPassword("");
      navigate("/login");
    } 
    catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } 
      else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="max-w-[1640px] flex justify-between h-screen">
      <div className="flex flex-col w-auto p-3 mx-auto align-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-8xl text-center px-4 pb-0 mt-2 mx-4">
            ToDo
          </h1>
          <h2 className="text-center text-sm sm:text-lg font-semibold p-4 mt-2 mx-4 text-gray-800">
            "Manage your task in an easy and more efficient way"
          </h2>
        </div>
        <form
          className="w-[300px] sm:w-[500px] mt-4 mx-auto bg-white p-4 py-5 rounded-md shadow-md"
          onSubmit={handleSubmit}>
          <div className="text-center text-3xl pb-3 my-2 font-bold text-gray-700">
            Register as a User
          </div>
          <div className="mb-4 p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your username
            </label>
            <input
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
              placeholder="Username (Minimum 5 characters)"
              required
            />
          </div>
          <div className="mb-4 p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 "
              required
              placeholder="Password (Minimum 5 characters)"
            />
          </div>
          <div className="p-2">
            <button
              type="submit"
              className=" text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-md w-full px-5 py-2.5 text-center ">
              Register
            </button>
            {error && (
              <div className="mt-3 text-red-600 bg-red-100 mt-2 w-full border-2 rounded-sm border-red-600 p-2">
                {error}
              </div>
            )}
            <div className="my-4 text-sm ">
              <p>
                Already Registerd ?
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-600 cursor-pointer hover:text-blue-800">
                  {" "}
                  Login
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden xl:flex w-auto h-screen pl-2">
        <img src={todoimg} alt="" className=" h-screen w-auto object-cover" />
      </div>
    </div>
  );
};

export default Register;
