import { Router } from "express";
import passport from "passport";
import { UserModel } from "../schema/user/db.mjs";
import jwt from "jsonwebtoken";

const router = Router();

export default router;

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, organisation: user.organisation, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};

router.post("/register", (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and Password required" });
  }

  req.body.usernameCase = req.body.username;
  req.body.username = req.body.username.toLowerCase();
  req.body.email = req.body.username;
  req.body.role = 'admin';

  const { username } = req.body;
  const newUser = UserModel(req.body);

  UserModel.find({ username })
    .then((users) => {
      if (users[0]) {
        res.status(400).send({ message: "Username exists" });
        return;
      }

      newUser.hashPassword().then(() => {
        newUser
          .save()
          .then((user) => {
            const token = createToken(user);
            res.json({
              message: "User created successfully",
              user: user.username,
              token,
            });
          })
          .catch((err) => {
            res.status(400).send({ message: "Create user failed", err });
          });
      });
    })
    .catch((err) => {
      res.status(400).send({ message: "Create user failed", err });
    });
});

router.post("/login", (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    req.login(user, (err) => {
      if (err) {
        res.status(401).send({ message: "Login failed", err });
      }
      const token = createToken(user);
      res.json({
        message: "User logged in successfully",
        user: user.username,
        token,
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(400).send({ message: "Logout failed", err });
    }

    req.session.destroy((err) => {
      if (err) {
        res.status(400).send({ message: "Logout failed", err });
      }

      res.clearCookie("sid");
      req.sessionID = null;
      res.send({ message: "Logged out successfully" });
    });
  });
});
