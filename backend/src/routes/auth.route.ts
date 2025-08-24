import express from "express";
import {
  loginFunction,
  logoutFunction,
  signupFunction,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  totalAdmins,
  totalUsers,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/users", verifyToken, totalUsers);
router.get("/admins", verifyToken, totalAdmins);

router.post("/signup", signupFunction);
router.post("/login", loginFunction);
router.post("/logout", logoutFunction);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
