//Author: Bikash Neupane
//https://www.linkedin.com/in/bikkashneupane/

import { createContext, useContext, useState } from "react";

// 1. create Context
const CreateSample = createContext();

// 2. creat a component that can Provides data to all the other components
export const sampleProvider = ({ children }) => {
  //define your states and functions here to pass as a prop
  const [count, setCount] = useState(0);

  return (
    <CreateSample.Provider value={(count, setCount)}>
      {children}
    </CreateSample.Provider>
  );
};

// 3. use Context
export const useSample = () => useContext(CreateContext);

// 4. Wrap your App.jsx insde useSample in your main.jsx file

// 5.Now import anything that is defined as value in sampleProvider in rest of your components like:
// import { UserProvider } from "./Context/SampleContext.jsx";
// const{count} = useSample()
