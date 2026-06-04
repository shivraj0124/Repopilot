import { Router } from "express";
import { analyzeRepository } from "../controllers/repository.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/analyze",
  authMiddleware,
  analyzeRepository
);

export default router;