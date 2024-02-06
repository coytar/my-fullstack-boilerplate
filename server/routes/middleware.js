export const requireAuth = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).send({ message: "User not authenticated" });
