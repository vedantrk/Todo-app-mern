import { useDispatch } from "react-redux";
import { setLogout } from "../state/todoSlicer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://todo-app-mern-api-ashen.vercel.app/logout",
        {},
        { withCredentials: true }
      );
      console.log("signing out");
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="max-w-[1640px]  mx-auto flex justify-between items-center p-4 bg-black">
      <div className="flex ">
        <h1 className="cursor-pointer px-2 text-4xl md:text-5xl lg:text-6xl text-white font-bold">
          ToDo
        </h1>
      </div>

      {/* Navbar menu */}
      <div className=" sm:flex justify-between items-center px-2 gap-6">
        <button
          onClick={handleLogout}
          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-md w-full px-5 py-2.5 text-center ">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
