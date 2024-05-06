import React from "react";
import { Navigate } from "react-router-dom";

export const AuthComponent = ({ children, loggedInUser }) => {
  return loggedInUser?._id ? children : <Navigate to="/" />;
};
