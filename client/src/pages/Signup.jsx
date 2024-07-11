import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10 mb-10">Sign Up</h1>

        <form className="flex flex-col items-center gap-4 ">
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="text"
            placeholder="email"
            id="email"
            name="email"
          />
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button className="bg-slate-700 text-white font-semibold  w-full p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>
        <div className="my-4 flex items-center gap-2">
          <span>Already have an account?</span>
          <Link className="text-blue-700 hover:opacity-95" to="/sign-in">Sign In </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
