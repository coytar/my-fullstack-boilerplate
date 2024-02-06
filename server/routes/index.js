import { Router } from "express";

import auth from "./auth.js";
import user from "./user.js";
import users from "./users.js";
import { requireAuth } from './middleware.js';

const router = Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/users", users);

// router.get("/*", (req, res) => {
//   res.sendFile(resolve(__dirname, "../../dist", "index.html"));
// });

router.get('/api/dashboard', requireAuth, (req, res) => {
  res.send({ message: 'Dashboard info' });
});

export default router;
