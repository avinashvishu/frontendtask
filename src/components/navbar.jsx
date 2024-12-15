import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigate();
  const handleNavigateUser = (route) => {
    navigation(route);
  };
  return (
    <header className="bg-[#1876d2] w-full text-white flex justify-between items-center px-6 py-4">
      <div
        onClick={() => handleNavigateUser("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        <span className="text-green-500">Pay</span>
        <span className="text-orange-500">Spaze</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleNavigateUser("/login")}
          className="px-4 py-2 bg-[#1876d2] shadow-md rounded transition"
        >
          Log In
        </button>
        <button
          onClick={() => handleNavigateUser("/signUp")}
          className="px-4 py-2 bg-[#1876d2] shadow-md  rounded transition"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
