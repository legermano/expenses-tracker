import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import expenseRoutes from './expense.routes';

const routes = new Router();

export default routes
  .use('/auth', authRoutes)
  .use('/user', userRoutes)
  .use('/expense', expenseRoutes);
