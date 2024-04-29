import "./App.css";
import { Dashboard } from "./components/pages/Dashboard";
import { Signup } from "./components/pages/Signup";
import { Login } from "./components/pages/Login";
import { Routes, Route } from "react-router-dom";

// import Button from "react-bootstrap/Button"; //maybe 3kb
// import { Button } from "react-bootstrap"; //maybe 300kb

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
