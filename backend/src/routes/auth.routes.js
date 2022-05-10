import { Router } from 'express';
import { checkDuplicateUsernameOrEmail } from '../middleware';
import * as authController from '../controllers/auth.controller';

const router = new Router();

export default router
  .post('/signup', [checkDuplicateUsernameOrEmail], authController.signup)
  .post('/signin', authController.signin);
