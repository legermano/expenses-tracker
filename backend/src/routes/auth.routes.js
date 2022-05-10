import { Router } from "express";
import { verifySignUp } from "../middleware";
import * as authController from "../controllers/auth.controller";

const router = new Router();

export default router
    .post(
        "/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        authController.signup
    )
    .post("/signin", authController.signin);