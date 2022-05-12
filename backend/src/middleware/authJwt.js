import { verify } from 'jsonwebtoken';
import secret from '../config/auth.config';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    return next();
  });

  return false;
};

export default verifyToken;
