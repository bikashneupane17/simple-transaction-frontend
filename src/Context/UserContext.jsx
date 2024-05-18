import { createContext, useContext, useEffect, useState } from "react";

import { getTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";

//. create a context
const UserContext = createContext();

//this is component
//2. provide data to all the components
export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filteredTrans, setFilteredTrans] = useState([]);
  const [transType, setTransType] = useState();
  const [idsToDelete, setIdsToDelete] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const title = "Add New Transaction";

  useEffect(() => {
    const userString = localStorage.getItem("user");
    userString && setLoggedInUser(JSON.parse(userString));
  }, []);

  const getTrans = async () => {
    const { status, message, trans } = await getTransaction();
    status === "error"
      ? toast.error(message)
      : (setTransactions(trans), setFilteredTrans(trans));
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        transactions,
        setTransactions,
        getTrans,
        showForm,
        setShowForm,
        title,
        filteredTrans,
        setFilteredTrans,
        transType,
        setTransType,
        idsToDelete,
        setIdsToDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//3. allows any component to consume the data
export const useUser = () => useContext(UserContext);
