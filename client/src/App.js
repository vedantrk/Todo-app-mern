import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { setLogin } from "./state/todoSlicer";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://todo-app-mern-api-ashen.vercel.app/api/user`,
          {
            withCredentials: true,
          }
        );

        dispatch(
          setLogin({ user: response.data.user, token: response.data.token })
        );
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/home" Component={HomePage}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
