import express from "express";
import { getCurrentUser, login, register } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.get("/getuser",authMiddleware, getCurrentUser);

export default router;