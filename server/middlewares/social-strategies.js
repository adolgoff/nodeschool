import passport from 'passport';
import {Strategy as FacebookStrategy}  from 'passport-facebook';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

const facebookStrategy = (req, res, next) => {
  // passport.use(new FacebookStrategy({
  //   clientID: '2098261510437824',
  //   clientSecret: 'ad135c74cf781a939b5c233c103898e2',
  //   callbackURL: "http://localhost:8080/auth/facebook/callback"
  // }, (accessToken, refreshToken, profile, cb) => {
  //   console.log(profile);
  // }));
  next();
};

// const twitterStrategy = (req, res, next) => {
//   passport.use(new TwitterStrategy({
//   consumerKey: 'HZq22DL8BTJByEoPNoh889YDp',
//   consumerSecret: '6G5CDfzCVvIecVOS6kv9kJR5pmbH83EoVAaIrZUYib2j3nyciR',
//   callbackURL: "http://localhost:8080/auth/twitter/callback"
// }, (accessToken, refreshToken, profile, cb) => {
//   console.log(profile);
// }))};

// const googleStrategy = () => {
//   passport.use(new GoogleStrategy({
//   clientID: '1036750475475-9h0qtd1c82kurk6sg35r21p7034r94lb.apps.googleusercontent.com',
//   clientSecret: '-9qUp9dPNBoou7coyH1IvfLK',
//   callbackURL: "http://localhost:8080/auth/google/callback"
// }, (token, tokenSecret, profile, done) => {
//   console.log(profile);
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
// }))};

export {
  facebookStrategy,
  // twitterStrategy,
  // googleStrategy,
};
