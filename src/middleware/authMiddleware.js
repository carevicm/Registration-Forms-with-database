import jwt from "jsonwebtoken";
import process from "process";

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next(new CustomError("No token, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    next(new CustomError("Token is not valid", 401));
  }
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({ message });
}
