import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

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

// Error handling

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
