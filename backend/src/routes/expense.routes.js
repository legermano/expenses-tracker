import { Router } from 'express';
import { validate, verifyToken } from '../middleware';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '../schemas/expense.schema';
import * as expenseController from '../controllers/expense.controller';

const router = new Router();

export default router
  .get('/all', [verifyToken], expenseController.fetchAll)
  .get('/:id', [verifyToken], expenseController.fetchOne)
  .post('/', [
    verifyToken,
    validate(createExpenseSchema),
    expenseController.create,
  ])
  .put(
    '/:id',
    [verifyToken, validate(updateExpenseSchema)],
    expenseController.update
  );
