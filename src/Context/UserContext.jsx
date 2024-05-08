import { createContext, useContext, useEffect, useState } from "react";
import { getTransaction } from "../axios/axiosHelper";

//. create a context
const UserContext = createContext();

//this is component
//2. provide data to all the components
export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const title = "Add New Transaction";

  useEffect(() => {
    const userString = localStorage.getItem("user");
    userString && setLoggedInUser(JSON.parse(userString));
  }, []);

  const getTrans = async () => {
    const { status, message, trans } = await getTransaction();
    status === "error" ? toast.error(message) : setTransactions(trans);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//3. allows any component to consume the data
export const useUser = () => useContext(UserContext);

//4. Use in main.jsx
{
  /* <React.StrictMode>
<BrowserRouter>
  <UserProvider>
    <App />
  </UserProvider>
</BrowserRouter>
</React.StrictMode> */
}
