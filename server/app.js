import express from 'express';
import formidable from 'express-formidable';
import logger from './middlewares/logger';
import parsedQuery from './middlewares/queryparser';
import parsedCookies from './middlewares/cookieparser';
import authGuard from './middlewares/authguard';

import usersRenderer from './routes/users.router';
import {
  productsRenderer,
  reviewsRenderer,
} from './routes/products.router';
import authRenderer from './routes/auth.route';


export const app = express();

const middlewares = [
  formidable(),
  parsedCookies,
  parsedQuery,
  logger
];

const routes = [
  {route: '/api/products/:id/reviews', use: reviewsRenderer, guard: authGuard},
  {route: '/api/products/:id', use: productsRenderer, guard: authGuard},
  {route: '/api/products/', use: productsRenderer, guard: authGuard},
  {route: '/api/users/:id', use: usersRenderer, guard: authGuard},
  {route: '/api/users/', use: usersRenderer, guard: authGuard},
  {route: '/auth', use: authRenderer},
];

[
  ...middlewares,
  ...routes,
].forEach((m) => m.use ?
  app.use(...[m.route, m.guard, m.use].filter((m) => m)) :
    app.use(m));

app.get('/', function (req, res) {
  res.send(`Hello World! ${JSON.stringify(req.parsedCookies)}`);
});

export default app;
