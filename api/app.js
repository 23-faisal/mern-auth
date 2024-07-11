import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// user router

app.use("/api/user", userRouter);

// auth router
app.use("/api/auth", authRouter);

// API request
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully",
  });
});
