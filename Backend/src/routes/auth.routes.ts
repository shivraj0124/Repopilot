import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  verifyOtpController,
  sendOtpController,
  githubCallbackController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import passport from "passport";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware,getCurrentUser);
router.post("/send-otp",sendOtpController);


router.post("/verify-otp",verifyOtpController);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  githubCallbackController
);
export default router;