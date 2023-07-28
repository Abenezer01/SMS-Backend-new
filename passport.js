// Passport
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const db = require("./models/index");
const { User } = db;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Passport authenticaton
passport.use(
  "clientLocal",
  new LocalStrategy(
    {
      usernameField: "email", // define the parameter in req.body that passport can use as username and password
      passwordField: "password",
    },
    (username, password, done) => {
      return User.scope("withPassword")
        .findOne({ where: { email: username }, raw: false })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          console.log(password, user);
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    }
  )
);

// Passport JWT Auth
passport.use(
  "clientJwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      console.log("jwtPayload", jwtPayload);

      return User.scope("withPassword")
        .findOne({ where: { id: jwtPayload.id }, raw: false })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect user." });
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("err", err);
          return done(err);
        });
    }
  )
);
