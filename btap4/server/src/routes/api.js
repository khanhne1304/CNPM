import { Router } from "express";
import { register, login, homepage, forgotPassword, handleResetPassword } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";
import { delay } from "../middleware/delay.js";
import { getHome } from "../controllers/homeController.js";

const router = Router();

// Public
router.post("/register", delay(300), register);
router.post("/login", delay(300), login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", handleResetPassword);

// Private
router.get("/home", requireAuth, homepage);

// Demo trang home EJS
router.get("/page/home", getHome);

export default router;
