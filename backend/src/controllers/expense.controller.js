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

export const create = async (req, res) => {
  Expense.create({
    userId: req.userId,
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
  })
    .then((expense) => {
      res.status(201).send({
        message: 'Expense was registered successfully!',
        expense,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const update = async (req, res) => {
  Expense.update(
    {
      name: req.body.name,
      description: req.body.description,
      value: req.body.value,
    },
    {
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
