import { Router } from "express";
import {
  signinController,
  signupController,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);

authRouter.post("/sign-in", signinController);
