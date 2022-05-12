import { Router } from 'express';
import { checkDuplicateEmail } from '../middleware';
import * as authController from '../controllers/auth.controller';

const router = new Router();

export default router
  .post('/register', [checkDuplicateEmail], authController.register)
  .post('/login', authController.login);
