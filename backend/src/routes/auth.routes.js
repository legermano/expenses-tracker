import { Router } from 'express';
import { checkDuplicateUsernameOrEmail } from '../middleware';
import * as authController from '../controllers/auth.controller';

const router = new Router();

export default router
  .post('/register', [checkDuplicateUsernameOrEmail], authController.register)
  .post('/login', authController.login);
