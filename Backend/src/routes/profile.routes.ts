import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getProfileStatsController } from "../controllers/profile.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  getProfileStatsController
);

export default router;