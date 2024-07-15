import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
 
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
