import { Router } from 'express';
import { verifyToken } from '../middleware';
import * as userController from '../controllers/user.controller';

const router = new Router();

export default router
  .get('/all', userController.allAccess)
  .get('/user', [verifyToken], userController.userBoard)
  .get('/me', [verifyToken], userController.me);
