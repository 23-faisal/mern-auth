import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  //
  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.error);
        loading(false);
        return;
      }
      if (data.success === false) {
        toast.error(data.message);
        loading(false);
        return;
      }
      toast.success("User logged In successfully");
      setLoading(false);
      setError(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error(error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10 mb-10">Sign In</h1>

        <form
          onSubmit={HandleSubmit}
          className="flex flex-col items-center gap-4 "
        >
          <input
            onChange={HandleChange}
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="text"
            placeholder="email"
            id="email"
            name="email"
          />
          <input
            onChange={HandleChange}
            className="bg-slate-100 p-3 rounded-lg w-full outline-none"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white font-semibold  w-full p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading" : "Sing In"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-2">
          <span>Don&#39;t have an account?</span>
          <Link className="text-blue-700 hover:opacity-95" to="/sign-up">
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
