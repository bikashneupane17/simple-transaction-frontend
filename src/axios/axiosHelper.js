import axios from "axios";

const rootAPI = import.meta.env.VITE_APP_API;
const apiSignupEndPoint = rootAPI + "/users/signup";
const apiLoginEndPoint = rootAPI + "/users/login";

const apiNewTransaction = rootAPI + "/transaction";

const getUserId = () => {
  const userStr = localStorage.getItem("user");
  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id ?? null;
};

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

export const postLogin = async (loginInfo) => {
  try {
    const { data } = await axios.post(apiLoginEndPoint, loginInfo);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTransaction = async (transactionObj) => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doen't exist! Login first");
    }

    const { data } = await axios.post(apiNewTransaction, transactionObj, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getTransaction = async () => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doen't exist! Login first");
    }

    const { data } = await axios.get(apiNewTransaction, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTransaction = async (idsToDelete) => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doen't exist! Login first");
    }

    const { data } = await axios.delete(apiNewTransaction, {
      data: idsToDelete,
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
