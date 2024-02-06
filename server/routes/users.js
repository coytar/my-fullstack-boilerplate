import { Router } from "express";

import { UserModel } from "../schema/user/db.mjs";

const router = Router();

export default router;

router.post("/checkusername", (req, res) => {
  const username = req.body.username.toLowerCase();

  UserModel.find({ username })
    .then((users) => {
      if (users && users[0]) {
        res.send({ available: false, message: "Username exists", username });
      } else {
        res.send({ available: true, message: "Username available", username });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Check username failed", err, username });
    });
});
