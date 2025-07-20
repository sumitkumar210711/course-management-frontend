import React, { useContext } from "react";
import { userAccountContext } from "../contextAPI/userAccountContext";

const Header = () => {
  const { logout, userAuth } = useContext(userAccountContext);

  return (
    <header className="fixed w-full flex justify-between items-center top-0 bg-blue-500 text-white shadow-lg px-4 py-3 md:px-12 z-50">
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        🎓 Course Management System
      </h1>

               {userAuth?.user && userAuth.user.role && (

        <button
          onClick={logout}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-100 transition-all duration-200"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
