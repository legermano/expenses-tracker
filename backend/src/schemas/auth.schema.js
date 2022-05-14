import * as yup from 'yup';

const registerSchema = yup.object({
  body: yup.object({
    username: yup
      .string()
      .trim()
      .min(5, 'Username must be at least 5 characters')
      .max(255)
      .required('Username is required'),
    email: yup
      .string()
      .email('Email must be valid')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be more than 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase character')
      .matches(/[a-z]/, 'Password must contain at least 1 lowercase character')
      .matches(/[0-9]/, 'Password must contain at least 1 numeric character')
      .matches(
        /[#?!@%%^&-]/,
        'Password must contain at least 1 special character'
      )
      .required('Password is required'),
  }),
});

const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Email must be a valid')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
});

export { registerSchema, loginSchema };
