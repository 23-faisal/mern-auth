import React from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleLoginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      const email = result.user.email;
      const photUrl = result.user.photoURL;

      const res = await fetch("http://localhost:3001/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photUrl,
        }),
      });
      const data = await res.json();
      dispatch(SignInSuccess(data));

      toast.success(`${name} logged in successfully`);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button
      onClick={HandleLoginWithGoogle}
      type="button"
      className="text-white font-semibold bg-red-700 w-full p-3 rounded-lg hover:opacity-95 uppercase border-0"
    >
      Log in with Google
    </button>
  );
};

export default GoogleOAuth;
