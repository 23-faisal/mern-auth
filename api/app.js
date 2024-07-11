import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// router

app.use("/api/user", userRouter);

// API request
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully",
  });
});
