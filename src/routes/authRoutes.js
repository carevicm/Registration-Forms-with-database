import express from "express";
import {
  signIn,
  signUp,
  checkEmail,
  changePassword,
  deleteUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/check-email", checkEmail);
router.post("/change-password", authMiddleware, changePassword);
router.delete("/delete-user", authMiddleware, deleteUser);

export default router;
