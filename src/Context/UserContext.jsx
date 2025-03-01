import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  // const admin=sessionStorage.getItem("admin")
  useEffect(() => {

    if(sessionStorage.getItem("admin")=="Admin"){   
      setIsAdminLogged(true)
    }
    console.log("isAdminLogged",isAdminLogged);
  }, []);



  const value = {
    loggedUser,
    setLoggedUser,
    userLoggedIn,
    setUserLoggedIn,
    isAdminLogged,
    setIsAdminLogged,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
