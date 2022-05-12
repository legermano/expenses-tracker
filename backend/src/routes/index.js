import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = new Router();

export default routes.use('/auth', authRoutes).use('/user', userRoutes);
