import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

// import Button from "react-bootstrap/Button"; //maybe 3kb
// import { Button } from "react-bootstrap"; //maybe 300kb

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem("user");
    userString && setLoggedInUser(JSON.parse(userString));
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard"
          element={<Dashboard loggedInUser={loggedInUser} />}
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
