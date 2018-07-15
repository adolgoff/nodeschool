import jwt from 'jsonwebtoken';
import config from '../config/config';

const authGuard = (req, res, next) => {
  const key = req.get('authorization') || '';
  jwt.verify(key.replace('Bearer ',''), config.secretKey, (err, decoded) => {
    err && res.status(403) && res.send({
      code: 403,
      message: 'Access denied',
    });

    decoded && decoded.data && next();
  });
}

export default authGuard;
