import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const Header = () => {
  //track login status
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { user } = useAuth();

  const handleLogout = () => {
    //force window location to login
    window.location.href = "/login";
    //clear token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-purple-100">
      <div className="p-2 flex justify-between items-center">
        {/* render users name */}
        <p className="font-bold text-xl text-purple-800">
          Welcome In {user?.username}
        </p>

        {/* logout button */}
        <button
          onClick={handleLogout}
          className="bg-purple-700 py-2 px-4 rounded-md hover:bg-purple-500 text-center flex items-center justify-center"
        >
          <p className="text-white font-semibold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
