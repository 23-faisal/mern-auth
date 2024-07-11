import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(400).json({
        success: false,
        message: "Email already Exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: `New user created successfully`,
      user: username,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
