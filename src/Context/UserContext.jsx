import { createContext, useEffect, useState } from "react";
import { getAllUsers, getUser } from "../services/allAPIS";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      if (result.status === 200) {
        setAllUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const admin=sessionStorage.getItem("admin")
  const fetchUserDeatails = async () => {
    console.log("in function");

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getUser(reqHeader);
      console.log(response, "res in user");

      setLoggedUser(response.data[0]);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("admin") == "Admin") {
      setIsAdminLogged(true);
    }
    if (sessionStorage.getItem("existing_User_Id")) {
      fetchUserDeatails();
      setUserLoggedIn(true);
    }
    fetchUsers();
  }, []);

  const value = {
    loggedUser,
    setLoggedUser,
    userLoggedIn,
    setUserLoggedIn,
    isAdminLogged,
    setIsAdminLogged,
    allUsers,
    setAllUsers,
    fetchUsers,
    fetchUserDeatails,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
