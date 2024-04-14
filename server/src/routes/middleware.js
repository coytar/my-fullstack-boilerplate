import jwt from "jsonwebtoken";
import { UserModel } from "../schema/user/db.mjs";

// export const requireAuth = (req, res, next) =>
//   req.isAuthenticated()
//     ? next()
//     : res.status(401).send({ message: "User not authenticated" });

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
