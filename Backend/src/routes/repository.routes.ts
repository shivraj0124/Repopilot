import { Router } from "express";
import { analyzeRepository, getHistory } from "../controllers/repository.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { rateLimiter } from "../middleware/rateLimiter.middleware";
const router = Router();

router.post(
  "/analyze",
  authMiddleware,
  rateLimiter(20, 60 * 60),
  analyzeRepository
);

router.get(
  "/history",
  authMiddleware,
  getHistory
);
export default router;