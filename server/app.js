import express from 'express';
import logger from './middlewares/logger';
import parsedQuery from './middlewares/queryparser';
import parsedCookies from './middlewares/cookieparser';

import usersRenderer from './routes/users.router';
import {
  productsRenderer,
  reviewsRenderer,
} from './routes/products.router';

export const app = express();

const middlewares = [
  parsedCookies,
  parsedQuery,
  logger
];

const routes = [
  {route: '/api/products/:id/reviews', use: reviewsRenderer},
  {route: '/api/products/:id', use: productsRenderer},
  {route: '/api/products/', use: productsRenderer},
  {route: '/api/users/:id', use: usersRenderer},
  {route: '/api/users/', use: usersRenderer},
];

[
  ...middlewares,
  ...routes,
].forEach((m) => !m.use ?
  app.use(m) :
  app.use(m.route, m.use));

app.get('/', function (req, res) {
  res.send(`Hello World! ${JSON.stringify(req.parsedCookies)}`);
});

export default app;
