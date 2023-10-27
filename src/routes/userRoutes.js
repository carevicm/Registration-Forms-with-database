import express from "express";
import { insertUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/insert", insertUser);
router.get("/all", getAllUsers);

export default router;
