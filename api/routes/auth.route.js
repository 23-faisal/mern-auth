import { Router } from "express";
import {
  signinController,
  signInWithGoogle,
  signupController,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);

authRouter.post("/sign-in", signinController);

authRouter.post("/google", signInWithGoogle);
