import { db } from '../models';

const { User } = db;

export const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

export const userBoard = (req, res) => {
  res.status(200).send('User content.');
};

export const me = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  return res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
  });
};
