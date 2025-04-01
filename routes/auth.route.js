import { Router } from "express";
import { SignIn, SignOut, SignUp, ForgotPassword, ResetPassword } from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/sign-up", SignUp);

authRoute.post("/sign-in", SignIn);

authRoute.post('/sign-out', SignOut);

authRoute.post('/forgot-pass', ForgotPassword);

authRoute.post('/reset-pass', ResetPassword);

export default authRoute;