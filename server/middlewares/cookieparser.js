import cookie from 'cookie';

const parsedCookies = (req, res, next) => {
  req.parsedCookies = cookie.parse(req.headers.cookie);
  next();
}

export default parsedCookies;
