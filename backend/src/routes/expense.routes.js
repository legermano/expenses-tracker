import { Router } from 'express';
import { verifyToken } from '../middleware';
import * as expenseController from '../controllers/expense.controller';

const router = new Router();

export default router
  .get('/', [verifyToken], expenseController.fetchAll)
  .get('/:id', [verifyToken], expenseController.fetchOne);
