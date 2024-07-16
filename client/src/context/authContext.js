import axios from "axios";
import { createContext, useEffect, useState } from "react"; // We can use "state management tool " :- redux but we are not changing here because we are not changing it here
// We use here #react context API
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //children = app component
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); // Every thing in localStorage is in string and we have to change it object so we use json.parse

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
    console.log(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };
  useEffect(() => {
    // Whenever we change current user then local storage also get updated
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider> ///states = value={{currentUser,login,logout}} => props , We can use these 3 states any where
  );
};

// Context API in React is a way to share values, like state or functions, among multiple components without having to pass them explicitly through each component as props.

// As we need user details in so many components like navbar, in write page ,single post updation and deletion , So we are storing it in context API. It just work like global variable or container which contain the all info related to the user.

// Once we create the contextProvider, we need to rap our App.js with it in index.js file . So that we can use userState in anywhere in our app
