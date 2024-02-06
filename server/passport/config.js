import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { v4 } from "uuid";
import { UserModel } from "../schema/user/db.mjs";
import { StrategyLocal } from "./strategies.js";

export const configPassport = (app) => {
  const sessionConfig = {
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: "sessions",
    }),
    genid: () => v4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // automatically extends the session age on each request. useful if you want
    // the user's activity to extend their session. If you want an absolute session
    // expiration, set to false
    rolling: true,
    name: 'sid', // don't use the default session cookie name
    // set your options for the session cookie
    cookie: {
      httpOnly: true,
      maxAge: 2 * 60 * 1000,      
    }
  };

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    UserModel.findById({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => console.warn(`err at deserialize: ${err}`))
  );

  passport.use(StrategyLocal);
};
