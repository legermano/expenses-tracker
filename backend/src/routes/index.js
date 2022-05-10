import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = new Router();

routes
    .use('/auth', authRoutes)
    .use('/test', userRoutes);

export { routes }