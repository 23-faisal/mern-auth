import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-10 my-8">Profile</h1>
      <div className="w-1/2 mx-auto">
        <form className="flex flex-col items-center w-full gap-4">
          <img
            className="h-24 w-24 object-cover mx-auto rounded-full "
            src={currentUser.user.profilePhoto}
            alt={currentUser.user.username}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={currentUser.user.username}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={currentUser.user.email}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <button className="bg-slate-700 text-white font-semibold  w-full p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Update
          </button>
        </form>
        <div className="flex items-center justify-between mt-4 font-semibold ">
          <span className="text-red-700 ">Delete Account</span>
          <span className="text-red-700 ">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
