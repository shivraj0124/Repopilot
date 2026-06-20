import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  verifyOtpController,
  sendOtpController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware,getCurrentUser);
router.post(
  "/send-otp",
  sendOtpController
);

router.post(
  "/verify-otp",
  verifyOtpController
);
export default router;