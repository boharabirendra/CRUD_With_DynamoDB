import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function authenticate(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
}
