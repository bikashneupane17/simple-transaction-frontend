import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

export const AuthComponent = ({ children }) => {
  const { loggedInUser } = useUser();

  return loggedInUser?._id ? children : <Navigate to="/" />;
};
