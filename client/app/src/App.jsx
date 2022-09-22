import logo from "./logo.svg";
import "./App.css";
import Icon from "@mdi/react";

import { mdiFoodCroissant } from "@mdi/js";
import Home from "./components/global/home";
import Navbar from "./components/global/navbar";
import { Route, Routes } from "react-router-dom";
import Registration from "./components/authentication/registration";
import Login from "./components/authentication/login";
function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <div className="flex-fill">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route
            path="/login"
            element={
              <div className="login-page">
                <Login></Login>
              </div>
            }
          ></Route>
          <Route
            path="/registration"
            element={
              <div className="registration-page">
                <Registration></Registration>
              </div>
            }
          ></Route>
        </Routes>
      </div>
      <footer>
        <Icon path={mdiFoodCroissant} size={1}></Icon>
      </footer>
    </div>
  );
}

export default App;
