import { db } from '../models';

const { User } = db;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((username) => {
    if (username) {
      res.status(400).send({
        message: 'Failed! Username is already in use',
      });

      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((userEmail) => {
      if (userEmail) {
        res.status(400).send({
          message: 'Failed! Email is already in use',
        });

        return;
      }

      next();
    });
  });
};

export default checkDuplicateUsernameOrEmail;
