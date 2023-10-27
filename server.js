import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import process from "process";

import { connectToDatabase } from "./src/utils/db.js";
import {
  signIn,
  signUp,
  checkEmail,
  changePassword,
  insertUser,
  getAllUsers,
  deleteUser,
} from "./src/controllers/authController.js";
import {
  authMiddleware,
  errorHandler,
} from "./src/middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Welcome to the Express server!"));
app.get("/insert", insertUser);
app.get("/users", getAllUsers);
app.post("/signin", signIn);
app.post("/signup", signUp);
app.post("/api/check-email", checkEmail);
app.post("/api/change-password", authMiddleware, changePassword);
app.get("/allowedaccess", authMiddleware, (req, res) =>
  res.send("This is a protected route")
);
app.delete("/api/delete-user", authMiddleware, deleteUser);
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
