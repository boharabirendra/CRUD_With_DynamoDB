import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid Token:", error.message);
    return null;
  }
}
