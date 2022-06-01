import * as yup from 'yup';

const createExpenseSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .trim()
      .min(5, 'Expense name must be at least 5 characteres')
      .required('Name is required'),
    description: yup.string(),
    value: yup.number().required('Value is required'),
  }),
});

const updateExpenseSchema = yup.object({
  params: yup.object({
    id: yup.number().integer().positive().required('Expense Id is required'),
  }),
  body: yup.object({
    name: yup
      .string()
      .trim()
      .min(5, 'Expense name must be at least 5 characteres'),
    description: yup.string(),
    value: yup.number(),
  }),
});

export { createExpenseSchema, updateExpenseSchema };
