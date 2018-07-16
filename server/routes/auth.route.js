import jwt from 'jsonwebtoken';
import users from '../models/users.model';
import md5 from '../helpers/crypto';
import config from '../config/config';

const authRenderer = (req, res) => {
  const {username, password} = req.fields;
  const existingUser = users.find((u) => u.email && username &&
    u.email.toLowerCase() === username.toLowerCase());
  const isAuth = password && md5(password) === md5(config.password);

  let response = {
    code: 404,
    message: 'Not found',
  };

  if (isAuth && existingUser) {
    const token = jwt.sign(
      {data: {userid: existingUser.guid}}, config.secretKey);

    response = Object.assign(response, {
      code: 200,
      message: 'OK',
      data: {user: existingUser},
      token,
    });
  };

  res.send(response);
}

export default authRenderer;
