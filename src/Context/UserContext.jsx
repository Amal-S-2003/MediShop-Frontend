import { createContext, useEffect, useState } from "react";
import { getAllUsers, getUser } from "../services/allAPIS";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      if (result?.status === 200) {
        setAllUsers(result.data);
      } else {
        console.log("Failed to fetch users. Response:", result);
      }
    } catch (error) {
      console.log("Error fetching users:", error.message);
    }
  };

  // Fetch logged-in user details
  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return; // No token, no need to fetch user

      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getUser(reqHeader);

      if (response?.data?.length > 0) {
        setLoggedUser(response.data[0]);
        setUserLoggedIn(true);
      } else {
        console.log("No user data found in response.");
      }
    } catch (error) {
      console.log("Error fetching user details:", error.message);
    }
  };

  // Run when the component mounts
  useEffect(() => {
    if (sessionStorage.getItem("admin") === "Admin") {
      setIsAdminLogged(true);
    }
    if (sessionStorage.getItem("existing_User_Id")) {
      fetchUserDetails();
    }
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        userLoggedIn,
        setUserLoggedIn,
        isAdminLogged,
        setIsAdminLogged,
        allUsers,
        setAllUsers,
        fetchUsers,
        fetchUserDetails,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
