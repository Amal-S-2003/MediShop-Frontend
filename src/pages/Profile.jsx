import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { loggedUser } = useContext(UserContext);
  const navigate=useNavigate()
  useEffect(() => {    
      console.log("loggedUser", loggedUser);
  }, []);
  return <div>  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    {
        loggedUser?
  <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
    
    {/* Profile Header */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700">
        {loggedUser?.username.charAt(0)}
      </div>
      <h2 className="mt-3 text-xl font-semibold">{loggedUser?.username}</h2>
      <p className="text-gray-500">{loggedUser?.email}</p>
    </div>

    {/* Profile Details */}
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-600 font-medium">Phone Number</span>
        <span className="text-gray-800">{loggedUser?.phoneNumber}</span>
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-600 font-medium">Address</span>
        <span className="text-gray-800">{loggedUser?.address}</span>
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-600 font-medium">Password</span>
        <span className="text-gray-800">********</span>
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-600 font-medium">Cart Items</span>
        <span className="text-gray-800">{loggedUser?.cart.length}</span>
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-6 flex justify-between">
      <button className="w-1/2 mr-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Edit Profile
      </button>
      <button className="w-1/2 ml-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </div>
  </div>:
  <div className="flex flex-col justify-center items-center">
    <p className="text-4xl font-medium text-gray-600 text-center">Please Login!!!</p>
<button onclick={navigate('/')} className="mt-5 px-7 rounded-lg py-2 bg-gray-600 text-white">Login</button>
  </div>
}
</div></div>;
}

export default Profile;
