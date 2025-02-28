import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/allAPIS";

function AdminViewUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const fetchUsers = async () => {
    const result = await getAllUsers();
    if (result.status == 200) {
      setAllUsers(result.data);    
      console.log(allUsers);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>AdminViewUsers</div>;
}

export default AdminViewUsers;
