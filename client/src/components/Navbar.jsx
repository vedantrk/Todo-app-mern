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
        "http://localhost:3001/api/logout",
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
    <div className="w-full p-4 bg-gray-900">
      <div className="flex max-w-[1640px] justify-between items-center p-2 mx-auto">
        <div>
          <h1 className="px-2 text-4xl md:text-5xl lg:text-6xl text-white font-bold">
            ToDo
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-md w-full px-5 py-2.5 text-center ">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
