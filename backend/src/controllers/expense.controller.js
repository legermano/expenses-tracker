import { db } from '../models';

const { Expense } = db;

export const fetchAll = async (req, res) => {
  const expenses = await Expense.findAll({
    where: {
      userId: req.userId,
    },
  });

  return res.status(200).send(expenses);
};

export const fetchOne = async (req, res) => {
  const expense = await Expense.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!expense) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  return res.status(200).send(expense);
};
