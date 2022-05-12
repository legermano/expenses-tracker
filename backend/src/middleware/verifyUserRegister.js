import { db } from '../models';

const { User } = db;

const checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((userEmail) => {
    if (userEmail) {
      res.status(400).send({
        message: 'Email is already in use',
      });

      return;
    }

    next();
  });
};

export default checkDuplicateEmail;
