import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    if (image) {
      HandleImageUpload(image);
    }
  }, [image]);

  const HandleImageUpload = async (image) => {
    const storage = getStorage(app);
    const date = new Date().getTime() * 1000;
    const randomNumber = Math.floor(Math.random() * 1000000000000);
    const fileName = `${date}_${randomNumber}_${image.name}.jpg`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePhoto: downloadURL })
        );
      }
    );
  };

  //
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-10 my-8">Profile</h1>
      <div className="w-1/2 mx-auto">
        <form className="flex flex-col items-center w-full gap-4">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 object-cover mx-auto rounded-full cursor-pointer"
            src={currentUser.user.profilePhoto}
            alt={currentUser.user.username}
          />
          <p>
            {imageError ? (
              <span className="text-red-700 text-sm font-semibold">
                Error uploading image (Image size must be less than 2MB)
              </span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-green-700 font-semibold text-sm">{`Uploading : ${imagePercentage}%`}</span>
            ) : imagePercentage === 100 ? (
              <span className="text-teal-700 font-semibold text-sm">
                Image uploaded successfully
              </span>
            ) : null}
          </p>
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
