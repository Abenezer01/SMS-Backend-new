const express = require("express");
const db = require("../index");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = db;
const saltRounds = 10;

router.get("/hello", (req, res) => {
  console.log(JSON.stringify(req.headers));

  res.send(JSON.stringify(req.headers));
});
// Register API
router.post("/register", (req, res) => {
  console.log("====================================");
  console.log("req.body:", req.body);
  console.log("====================================");
  if (req.body.email && req.body.password) {
    User.findOne({ where: { email: req.body.email }, raw: false })
      .then((user) => {
        if (user) {
          res.status(401).json({ message: "email already exists" });
        } else {
          const hash = bcrypt.hashSync(req.body.password, saltRounds);
          console.log("hash:", hash);
          User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
          })
            .then((userNew) => {
              const payload = { id: userNew.id };
              const token = jwt.sign(payload, process.env.JWT_SECRET);
              res.json({ token });
            })
            .catch(() => {
              res.status(500).json({ message: "Error Creating User" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(500).json({ message: "Insufficient Information to register" });
  }
});

// Login API
router.post("/login", (req, res, done) => {
  passport.authenticate("clientLocal", (err, user, info) => {
    if (err) {
      return done(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      console.log("wherr", info);

      return res.status(500).json({ success: false, info });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return done(loginErr);
      }
      const payload = { id: req.user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const ability = [
        { action: "read", subject: "Auth" },
        { action: "read", subject: "dashboard" },
        { action: "manage", subject: "all" },
      ];
      user["role"] = ["Admin"];
      return res.json({ token, user, ability });
    });
  })(req, res, done);
});

// Get User API
router.get(
  "/:id",
  passport.authenticate(["clientJwt"], { session: false }),
  (req, res) => {
    console.log("is working");
    const clientId = req.params.id;
    return User.findOne({
      where: {
        id: clientId,
      },
      raw: false,
    }).then((result) => {
      console.log(result);
      res.send(result);
    });
  }
);

module.exports = router;
