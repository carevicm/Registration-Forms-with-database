import User from "../models/User.js";
import { connectToDatabase } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

// eslint-disable-next-line no-unused-vars
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}


function generateToken(userId, rememberMe) {
  const payload = { user: { id: userId } };
  const expiresIn = rememberMe ? "7d" : "1h";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}


function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

export async function signIn(req, res, next) {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Username is not matching", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Password is not matching", 400);

    const token = generateToken(user.id, rememberMe);
    setTokenCookie(res, token);

    res.status(200).json({ msg: "User logged in successfully" });
  } catch (err) {
    next(err);
  }
}

export async function signUp(req, res, next) {
  const { email, password, rememberMe, fullName, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) throw new CustomError("User already exists", 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullName, email, phone, password: hashedPassword });
    await user.save();

    const token = generateToken(user.id, rememberMe);
    setTokenCookie(res, token);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    next(err);
  }
}

export async function checkEmail(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = generateToken(user.id, false);
      setTokenCookie(res, token);
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  const userId = req.user.id;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) throw new CustomError("User does not exist", 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) throw new CustomError("User does not exist", 400);

    await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
}

export async function insertUser(req, res, next) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");
    const result = await collection.insertOne({ fullName: "John Example" });
    res.send(`Document inserted with _id: ${result.insertedId}`);
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
}
