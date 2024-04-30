import axios from "axios";

const rootAPI = import.meta.env.VITE_APP_API;
const apiSignupEndPoint = rootAPI + "/users/signup";
const apiLoginEndPoint = rootAPI + "/users/login";

// const apiSignupEndPoint = "http://localhost:8000/api/v1/users/signup";
// const apiLoginEndPoint = "http://localhost:8000/api/v1/users/login";

export const postSignup = async (userObj) => {
  try {
    const { data } = await axios.post(apiSignupEndPoint, userObj);
    console.log(data);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postLogin = async (userObj) => {
  try {
    const { data } = await axios.post(apiLoginEndPoint, userObj);
    console.log(data);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
