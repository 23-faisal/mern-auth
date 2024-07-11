import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signupController = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

// sign in

export const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Remove hashedPassword from user object before sending in response
    const { password: hashedPassword, ...rest } = validUser._doc;

    // Set cookie expiration date
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now

    // Set cookie with token
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        user: rest,
      });
  } catch (error) {
    next(error); 
  }
};
