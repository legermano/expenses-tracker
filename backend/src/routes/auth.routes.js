import { Router } from 'express';
import { checkDuplicateEmail, validate } from '../middleware';
import { register, login } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = new Router();

router.post(
  '/register',
  [validate(registerSchema), checkDuplicateEmail],
  register
);

router.post('/login', validate(loginSchema), login);

export default router;
