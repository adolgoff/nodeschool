import express from 'express';
import formidable from 'express-formidable';
import logger from './middlewares/logger';
import parsedQuery from './middlewares/queryparser';
import parsedCookies from './middlewares/cookieparser';
import authGuard from './middlewares/authguard';
import passport from 'passport';

import {
  facebookStrategy,
//   twitterStrategy,
//   googleStrategy,
} from './middlewares/social-strategies';

import usersRenderer from './routes/users.router';
import {
  productsRenderer,
  reviewsRenderer,
} from './routes/products.router';
import authRenderer from './routes/auth.route';


export const app = express();

const middlewares = [
  parsedCookies,
  parsedQuery,
  passport.initialize(),
  passport.session(),
  formidable(),

  // auth straregies
  facebookStrategy,
  // twitterStrategy,
  // googleStrategy,

  logger
];

const routes = [
  {route: '/api/products/:id/reviews', use: reviewsRenderer, guard: authGuard},
  {route: '/api/products/:id', use: productsRenderer, guard: authGuard},
  {route: '/api/products/', use: productsRenderer, guard: authGuard},
  {route: '/api/users/:id', use: usersRenderer},
  {route: '/api/users/', use: usersRenderer},
  // {route: '/api/users/:id', use: usersRenderer, guard: authGuard},
  // {route: '/api/users/', use: usersRenderer, guard: authGuard},
  {route: '/auth', use: authRenderer},

  // auth callbacks
  // {route: '/auth/facebook', use: passport.authenticate('facebook')},
  // {route: '/auth/facebook/callback', use: passport.authenticate('facebook',
  //   {successRedirect: '/', failureRedirect: '/login' })},
  // {route: '/auth/twitter', use: passport.authenticate('twitter')},
  // {route: '/auth/twitter/callback', use: passport.authenticate('twitter',
  //   {successRedirect: '/', failureRedirect: '/login' })},
  // {route: '/auth/google', use: passport.authenticate('google')},
  // {route: '/auth/google/callback', use: passport.authenticate('google',
  //   {successRedirect: '/', failureRedirect: '/login' })},
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
