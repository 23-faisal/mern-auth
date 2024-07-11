import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-slate-200 py-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-slate-950">MERN Auth</h1>
        </div>
        <div className="flex items-center gap-4 font-semibold text-slate-800 ">
          <Link to="/">Home </Link>
          <Link to="/about">About </Link>
          <Link to="/sign-in">Sign In </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
