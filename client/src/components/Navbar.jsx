import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full bg-slate-200 py-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-slate-950">MERN Auth</h1>
        </div>
        <div className="flex items-center gap-4 font-semibold text-slate-800 ">
          <Link to="/">Home </Link>
          <Link to="/about">About </Link>

          <Link to="/profile">
            {currentUser ? (
              <>
                <img
                  className="w-6 h-6 object-cover rounded-full  cursor-pointer"
                  src={currentUser.user.profilePhoto}
                  alt={currentUser.user.username}
                />
              </>
            ) : (
              <>
                <Link to="/sign-in">Sign In </Link>
              </>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
