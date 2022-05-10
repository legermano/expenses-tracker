import { Router } from 'express';
import { authJwt } from '../middleware';
import * as userController from '../controllers/user.controller';

const router = new Router();

export default router.
    get("/all", userController.allAccess).
    get("/user", [authJwt.verifyToken], userController.userBoard);