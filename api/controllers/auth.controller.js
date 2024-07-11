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
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(400).json({
        success: false,
        message: "User does not exists!",
      });
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: validPassword._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expiryDate: expiryDate,
      })
      .status(200)
      .json({
        rest,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};
