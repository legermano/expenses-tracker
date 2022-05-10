import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../models';
import secret from '../config/auth.config';

const { User } = db;

export const signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.send({ message: 'User was registered successfully!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid password!',
        });
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
