import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../schema/user/db.mjs";

export const StrategyLocal = new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "Username doesn't exist" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    })
    .catch((err) => done(err));
});
